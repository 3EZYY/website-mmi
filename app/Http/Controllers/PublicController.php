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
    public function collections(): Response
    {
        $collections = MusicCollection::orderBy('created_at', 'desc')->get();

        return Inertia::render('Collections/CollectionsGallery', [
            'collections' => $collections
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
            'payment_method' => 'required|string|in:gopay,dana,qris,bca,ovo,shopeepay',
        ]);

        // Create ticket record
        $ticket = Ticket::create([
            'user_id' => Auth::id(),
            'visitor_name' => $validated['visitor_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'visit_date' => $validated['visit_date'],
            'quantity' => $validated['quantity'],
            'total_price' => $validated['total_price'],
            'payment_method' => $validated['payment_method'],
            'status' => 'confirmed',
        ]);

        // Return success page with ticket details
        return Inertia::render('Tickets/TicketSuccess', [
            'ticket' => $ticket
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
        $order->load('orderItems.souvenirs');
        return Inertia::render('Souvenirs/OrderSuccess', [
            'order' => $order
        ]);
    }
}
