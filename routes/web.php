<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Models\News;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $news = News::where('is_published', true)
        ->orderBy('published_at', 'desc')
        ->limit(3)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'news' => $news,
    ]);
})->name('home');

// Public Pages Routes
Route::get('/news', [PublicController::class, 'news'])->name('news');
Route::get('/news/{id}', [PublicController::class, 'newsShow'])->name('news.show');
Route::get('/collections', [PublicController::class, 'collections'])->name('collections');
Route::get('/tickets', [PublicController::class, 'tickets'])->name('tickets');
Route::post('/tickets', [PublicController::class, 'processTickets'])->name('tickets.process');
Route::get('/souvenirs', [PublicController::class, 'souvenirs'])->name('souvenirs');
Route::get('/checkout', [PublicController::class, 'checkout'])->name('checkout');
Route::post('/checkout', [PublicController::class, 'processCheckout'])->name('checkout.process');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [PublicController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [PublicController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/orders/{order}', [PublicController::class, 'deleteOrder'])->name('orders.delete');
    Route::delete('/tickets/{ticket}', [PublicController::class, 'deleteTicket'])->name('tickets.delete');
});

// Google OAuth Routes
Route::get('/auth/google', [SocialAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'callback'])->name('auth.google.callback');

require __DIR__ . '/auth.php';
