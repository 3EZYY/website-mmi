<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // Relasi ke orders (UUID)
            $table->foreignUuid('order_id')->constrained('orders')->onDelete('cascade');
            
            // Relasi ke souvenirs (UUID)
            $table->foreignUuid('souvenir_id')->constrained('souvenirs')->onDelete('cascade');
            
            $table->integer('quantity');
            $table->integer('price');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};