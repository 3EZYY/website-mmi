<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@mmi.com'],
            [
                'name' => 'Admin MMI',
                'email' => 'admin@mmi.com',
                'password' => Hash::make('qwqw24!@'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
