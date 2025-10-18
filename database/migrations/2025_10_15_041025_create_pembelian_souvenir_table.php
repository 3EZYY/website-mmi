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
        Schema::create('pembelian_souvenir', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengunjung_id');
            $table->foreignId('souvenir_id');
            $table->integer('jumlah');
            $table->decimal('total_harga', 10, 2);
            $table->timestamp('tanggal_pembelian')->useCurrent();
            $table->foreign('pengunjung_id')->references('id')->on('pengunjung')->onDelete('cascade');
            $table->foreign('souvenir_id')->references('id')->on('souvenir')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembelian_souvenir');
    }
};
