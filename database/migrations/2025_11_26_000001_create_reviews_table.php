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
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('souvenir_id')->nullable()->constrained('souvenirs')->onDelete('cascade');
            $table->foreignUuid('collection_id')->nullable()->constrained('music_collections')->onDelete('cascade');
            
            $table->integer('rating')->unsigned(); // 1-5 rating
            $table->text('comment');
            
            $table->timestamps();
            
            // Ensure at least one product reference exists
            $table->index(['user_id', 'souvenir_id']);
            $table->index(['user_id', 'collection_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
