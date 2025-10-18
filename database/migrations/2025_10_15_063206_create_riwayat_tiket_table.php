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
        Schema::create('riwayat_tiket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pembelian_tiket_id');
            $table->string('status', 50)->default('selesai');
            $table->timestamp('waktu_pembelian')->useCurrent();
            $table->foreign('pembelian_tiket_id')->references('id')->on('pembelian_tiket')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_tiket');
    }
};
