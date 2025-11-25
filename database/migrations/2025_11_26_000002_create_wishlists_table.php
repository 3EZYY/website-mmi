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
        Schema::create('wishlists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('souvenir_id')->constrained('souvenirs')->onDelete('cascade');
            
            $table->timestamps();
            
            // Prevent duplicate entries
            $table->unique(['user_id', 'souvenir_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
    }
};
