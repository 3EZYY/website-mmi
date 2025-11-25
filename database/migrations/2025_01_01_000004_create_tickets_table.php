<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // PERHATIAN: Pastikan tabel 'users' kamu id-nya juga UUID. 
            // Jika user pakai id angka biasa, ganti foreignUuid jadi foreignId
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            // Atau jika users pakai UUID: $table->foreignUuid('user_id')...
            
            $table->string('visitor_name');
            $table->string('email');
            $table->string('phone');
            $table->date('visit_date');
            $table->integer('quantity')->default(1);
            $table->integer('total_price');
            $table->string('status')->default('pending');
            
            // Kolom tambahan dari update SQL kamu
            $table->string('payment_method')->default('gopay');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};