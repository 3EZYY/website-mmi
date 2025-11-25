<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // Sesuaikan tipe data ID user disini (foreignId atau foreignUuid)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->integer('total_amount');
            $table->string('status')->default('pending');
            $table->text('shipping_address');
            $table->string('phone');
            
            // Kolom tambahan dari update SQL kamu
            $table->string('payment_method')->default('gopay');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};