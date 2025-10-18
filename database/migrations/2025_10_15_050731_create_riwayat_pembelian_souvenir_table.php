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
        Schema::create('riwayat_pembelian_souvenir', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pembelian_souvenir_id');
            $table->string('status', 50)->default('selesai');
            $table->timestamp('waktu_pembelian')->useCurrent();

            // relasi foreign key
            $table->foreign('pembelian_souvenir_id')->references('id')->on('pembelian_souvenir')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_pembelian_souvenir');
    }
};
