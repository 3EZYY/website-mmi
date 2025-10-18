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
        Schema::create('pembelian_tiket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengunjung_id');
            $table->string('jenis_tiket', 100);
            $table->integer('jumlah');
            $table->decimal('harga_per_tiket', 10, 2);
            $table->decimal('total_harga', 10, 2);
            $table->timestamp('tanggal_pembelian')->useCurrent();
            $table->foreign('pengunjung_id')->references('id')->on('pengunjung')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembelian_tiket');
    }
};
