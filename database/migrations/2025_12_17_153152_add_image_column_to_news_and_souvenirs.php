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
        // Add image column to news table
        Schema::table('news', function (Blueprint $table) {
            $table->string('image')->nullable()->after('content');
        });

        // Add image column to souvenirs table
        Schema::table('souvenirs', function (Blueprint $table) {
            $table->string('image')->nullable()->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        Schema::table('souvenirs', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
