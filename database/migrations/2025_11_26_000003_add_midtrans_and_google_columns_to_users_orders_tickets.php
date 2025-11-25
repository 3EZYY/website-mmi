<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add Google OAuth columns to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('google_id')->nullable()->after('avatar');
            $table->text('google_token')->nullable()->after('google_id');
            $table->text('google_refresh_token')->nullable()->after('google_token');
        });

        // Add Midtrans payment columns to orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->string('snap_token')->nullable()->index()->after('payment_method');
            $table->string('payment_status')->default('pending')->index()->after('snap_token');
            $table->string('payment_type')->nullable()->after('payment_status');
        });

        // Add Midtrans payment columns to tickets table
        Schema::table('tickets', function (Blueprint $table) {
            $table->string('snap_token')->nullable()->index()->after('payment_method');
            $table->string('payment_status')->default('pending')->index()->after('snap_token');
            $table->string('payment_type')->nullable()->after('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'google_token', 'google_refresh_token']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['snap_token', 'payment_status', 'payment_type']);
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['snap_token', 'payment_status', 'payment_type']);
        });
    }
};
