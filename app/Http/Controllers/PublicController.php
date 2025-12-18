<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\MusicCollection;
use App\Models\Souvenir;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;

class PublicController extends Controller
{
    /**
     * Display news listing page
     */
    public function news(): Response
    {
        $news = News::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('News/News', [
            'news' => $news
        ]);
    }

    /**
     * Display individual news article
     */
    public function newsShow(string $id): Response
    {
        $news = News::where('is_published', true)
            ->findOrFail($id);

        return Inertia::render('News/NewsDetail', [
            'news' => $news
        ]);
    }

    /**
     * Display collections gallery page
     */
    public function collections(Request $request): Response
    {
        $category = $request->query('category');

        $collections = MusicCollection::query()
            ->when($category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Collections/CollectionsGallery', [
            'collections' => $collections,
            'currentFilter' => $category ?? 'all',
        ]);
    }

    /**
     * Display ticket booking page
     */
    public function tickets(): Response
    {
        return Inertia::render('Tickets/Tickets', [
            'ticketPrice' => 5000 // Can be moved to config
        ]);
    }

    /**
     * Display souvenirs shop page
     */
    public function souvenirs(): Response
    {
        $souvenirs = Souvenir::orderBy('created_at', 'desc')->get();

        return Inertia::render('Souvenirs/Souvenirs', [
            'souvenirs' => $souvenirs
        ]);
    }

    /**
     * Display profile page with orders and tickets
     */
    public function profile(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $orders = $user->orders()
            ->with('orderItems.souvenirs')
            ->orderBy('created_at', 'desc')
            ->get();

        $tickets = $user->tickets()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'orders' => $orders,
            'tickets' => $tickets
        ]);
    }

    /**
     * Process ticket booking submission
     */
    public function processTickets(Request $request): Response
    {
        $validated = $request->validate([
            'visitor_name' => 'required|string|min:3|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|min:10|max:20',
            'visit_date' => 'required|date|after_or_equal:today',
            'quantity' => 'required|integer|min:1|max:50',
            'total_price' => 'required|numeric|min:0',
        ]);

        // Create ticket record with pending status
        $ticket = Ticket::create([
            'user_id' => Auth::id(),
            'visitor_name' => $validated['visitor_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'visit_date' => $validated['visit_date'],
            'quantity' => $validated['quantity'],
            'total_price' => $validated['total_price'],
            'status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        // Configure Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        // Create transaction params for Midtrans
        $params = [
            'transaction_details' => [
                'order_id' => 'TICKET-' . $ticket->id,
                'gross_amount' => (int) $validated['total_price'],
            ],
            'customer_details' => [
                'first_name' => $validated['visitor_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
            ],
            'item_details' => [
                [
                    'id' => 'ticket',
                    'price' => (int) ($validated['total_price'] / $validated['quantity']),
                    'quantity' => $validated['quantity'],
                    'name' => 'Tiket Museum',
                ],
            ],
        ];

        // Generate Snap Token
        $snapToken = Snap::getSnapToken($params);

        // Save snap token to ticket
        $ticket->snap_token = $snapToken;
        $ticket->save();

        // Return success page with ticket details and Midtrans client key
        return Inertia::render('Tickets/TicketSuccess', [
            'ticket' => $ticket,
            'clientKey' => config('midtrans.client_key'),
        ]);
    }

    /**
     * Tampilkan Halaman Checkout dengan Data dari Database
     */
    public function checkout(Request $request): Response
    {
        $cart = $request->input('cart', []);
        $souvenirIds = array_keys($cart);
        $souvenirs = Souvenir::whereIn('id', $souvenirIds)->get();
        return Inertia::render('Souvenirs/Checkout', [
            'cart' => $cart,
            'souvenirs' => $souvenirs
        ]);
    }

    /**
     * Process souvenir order checkout
     */
    public function processCheckout(Request $request): Response
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:20',
            'shipping_address' => 'required|string|max:500',
            'payment_method' => 'required|string|in:gopay,dana,qris,bca,ovo,shopeepay',
            'order_items' => 'required|array|min:1',
            'order_items.*.souvenir_id' => 'required|uuid|exists:souvenirs,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|integer|min:0',
            'total_amount' => 'required|integer|min:0',
        ]);

        // Create the order
        $order = \App\Models\Order::create([
            'user_id' => Auth::id(),
            'total_amount' => $validated['total_amount'],
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'payment_method' => $validated['payment_method'],
            'shipping_address' => $validated['shipping_address'],
            'phone' => $validated['phone'],
        ]);

        // Create order items
        foreach ($validated['order_items'] as $item) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'souvenir_id' => $item['souvenir_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // Configure Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        // Create transaction params for Midtrans
        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => (int) $validated['total_amount'],
            ],
            'customer_details' => [
                'email' => Auth::user()->email,
                'phone' => $validated['phone'],
            ],
        ];

        // Generate Snap Token
        $snapToken = Snap::getSnapToken($params);

        // Save snap token to order
        $order->snap_token = $snapToken;
        $order->save();

        $order->load('orderItems.souvenirs');

        return Inertia::render('Souvenirs/OrderSuccess', [
            'order' => $order,
            'clientKey' => config('midtrans.client_key'),
        ]);
    }

    /**
     * Delete a pending order
     */
    public function deleteOrder(string $id)
    {
        $order = \App\Models\Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$order) {
            return back()->withErrors(['error' => 'Pesanan tidak ditemukan atau tidak dapat dihapus']);
        }

        // Delete order items first
        $order->orderItems()->delete();

        // Delete the order
        $order->delete();

        return to_route('profile')->with('success', 'Pesanan berhasil dihapus');
    }

    /**
     * Delete a pending ticket
     */
    public function deleteTicket(string $id)
    {
        $ticket = Ticket::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$ticket) {
            return back()->withErrors(['error' => 'Tiket tidak ditemukan atau tidak dapat dihapus']);
        }

        $ticket->delete();

        return to_route('profile')->with('success', 'Tiket berhasil dihapus');
    }

    /**
     * Update user avatar
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:200', // max 200KB
        ], [
            'avatar.max' => 'Ukuran foto maksimal 200 KB',
            'avatar.image' => 'File harus berupa gambar',
            'avatar.mimes' => 'Format gambar harus jpeg, png, jpg, gif, atau webp',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Delete old avatar if exists and is not a URL (external avatar)
        if ($user->avatar && !filter_var($user->avatar, FILTER_VALIDATE_URL)) {
            $oldPath = public_path('storage/' . $user->avatar);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');

        // Update user avatar
        $user->avatar = $path;
        $user->save();

        return redirect()->route('profile')->with('success', 'Foto profil berhasil diperbarui');
    }
}
