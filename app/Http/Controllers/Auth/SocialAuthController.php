<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google OAuth provider.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')
            ->with([
                'access_type' => 'offline',
                'prompt' => 'consent'
            ])
            ->redirect();
    }

    /**
     * Handle Google OAuth callback.
     */
    public function callback(): RedirectResponse
    {
        try {
            // Retrieve user information from Google
            $googleUser = Socialite::driver('google')->user();

            // Find user by google_id or email
            $user = User::where('google_id', $googleUser->id)
                ->orWhere('email', $googleUser->email)
                ->first();

            if ($user) {
                // Update existing user with Google tokens
                $user->update([
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'avatar' => $user->avatar ?? $googleUser->avatar, // Keep existing avatar if present
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'role' => 'client',
                    'avatar' => $googleUser->avatar,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'password' => Hash::make(Str::random(24)), // Random password for OAuth users
                    'email_verified_at' => now(), // Auto-verify email for Google users
                ]);
            }

            // Login the user
            Auth::login($user);

            // Role-based redirect
            if ($user->role === 'admin') {
                return redirect()->intended('/admin/dashboard');
            }

            return redirect()->intended('/');

        } catch (Exception $e) {
            return redirect('/login')->withErrors([
                'google' => 'Failed to authenticate with Google. Please try again.',
            ]);
        }
    }
}
