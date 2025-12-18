<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Add 'image' column for file uploads to souvenirs, music_collections, and news tables.
     */
    public function up(): void
    {
        // Add image column to souvenirs table (if not exists)
        if (!Schema::hasColumn('souvenirs', 'image')) {
            Schema::table('souvenirs', function (Blueprint $table) {
                $table->string('image')->nullable()->after('price');
            });
        }

        // Add image column to music_collections table (if not exists)
        if (!Schema::hasColumn('music_collections', 'image')) {
            Schema::table('music_collections', function (Blueprint $table) {
                $table->string('image')->nullable()->after('history');
            });
        }

        // Add image column to news table (if not exists)
        if (!Schema::hasColumn('news', 'image')) {
            Schema::table('news', function (Blueprint $table) {
                $table->string('image')->nullable()->after('content');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('souvenirs', 'image')) {
            Schema::table('souvenirs', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }

        if (Schema::hasColumn('music_collections', 'image')) {
            Schema::table('music_collections', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }

        if (Schema::hasColumn('news', 'image')) {
            Schema::table('news', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }
    }
};
