<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Midtrans Server Key
    |--------------------------------------------------------------------------
    |
    | Your Midtrans server key for API authentication.
    | Get this from your Midtrans Dashboard.
    |
    */
    'server_key' => env('MIDTRANS_SERVER_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Midtrans Client Key
    |--------------------------------------------------------------------------
    |
    | Your Midtrans client key for frontend Snap integration.
    | Get this from your Midtrans Dashboard.
    |
    */
    'client_key' => env('MIDTRANS_CLIENT_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Production Mode
    |--------------------------------------------------------------------------
    |
    | Set to true for production environment, false for sandbox/testing.
    |
    */
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),

    /*
    |--------------------------------------------------------------------------
    | Sanitization
    |--------------------------------------------------------------------------
    |
    | Enable/disable input sanitization.
    |
    */
    'is_sanitized' => true,

    /*
    |--------------------------------------------------------------------------
    | 3DS Security
    |--------------------------------------------------------------------------
    |
    | Enable/disable 3D Secure authentication.
    |
    */
    'is_3ds' => true,
];
