<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('music_collections', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            $table->string('name');
            $table->string('category');
            $table->string('origin')->nullable();
            $table->text('description')->nullable();
            $table->text('history')->nullable();
            $table->text('image_url')->nullable();
            $table->integer('year')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('music_collections');
    }
};