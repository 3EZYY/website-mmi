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
        // Add Midtrans payment columns to orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->string('snap_token')->nullable()->index()->after('payment_method');
            $table->string('payment_status')->defaFult('pending')->index()->after('snap_token');
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
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['snap_token', 'payment_status', 'payment_type']);
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['snap_token', 'payment_status', 'payment_type']);
        });
    }
};
