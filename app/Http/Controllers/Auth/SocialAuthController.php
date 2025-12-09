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

            // Validate that essential information is present
            if (empty($googleUser->id) || empty($googleUser->email)) {
                throw new Exception('Invalid Google user data received.');
            }

            // Find user by google_id first, then by email
            $user = User::where('google_id', $googleUser->id)->first();
            
            if (!$user) {
                $user = User::where('email', $googleUser->email)->first();
            }

            if ($user) {
                // Update existing user with Google credentials
                $user->update([
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken ?? null,
                    'avatar' => $user->avatar ?? $googleUser->avatar,
                    'email_verified_at' => $user->email_verified_at ?? now(), // Verify email if not already
                ]);
            } else {
                // Create new user with Google credentials
                $user = User::create([
                    'name' => $googleUser->name ?? 'Google User',
                    'email' => $googleUser->email,
                    'role' => 'client',
                    'avatar' => $googleUser->avatar ?? null,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken ?? null,
                    'password' => Hash::make(Str::random(32)), // Secure random password
                    'email_verified_at' => now(), // Auto-verify email for Google users
                ]);
            }

            // Login the user
            Auth::login($user, true); // Remember the user

            // Role-based redirect with proper fallback
            $redirectPath = match ($user->role) {
                'admin' => '/admin/dashboard',
                default => '/',
            };

            return redirect()->intended($redirectPath);

        } catch (Exception $e) {
            // Log the error for debugging
            \Log::error('Google OAuth Error: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);

            return redirect('/login')->withErrors([
                'google' => 'Failed to authenticate with Google. Please try again.',
            ]);
        }
    }
}
