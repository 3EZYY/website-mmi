<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('souvenirs', function (Blueprint $table) {
            // UUID sebagai Primary Key sesuai SQL
            $table->uuid('id')->primary();
            
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('price'); // Menggunakan integer (tanpa desimal)
            $table->text('image_url')->nullable();
            $table->string('category');
            $table->integer('stock')->default(0);
            
            $table->timestamps(); // Otomatis buat created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('souvenirs');
    }
};