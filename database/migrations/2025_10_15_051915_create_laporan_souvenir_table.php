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
        Schema::create('laporan_souvenir', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id');
            $table->foreignId('pembelian_souvenir_id');

            $table->integer('jumlah')-> default(0);
            $table->decimal('total_pendapatan', 15, 2)-> default(0.00);
            $table->date('periode');
            $table->timestamp('dibuat_pada')->useCurrent();

            // foreign key
            $table->foreign('admin_id')->references('id')->on('admin')->onDelete('cascade');
            $table->foreign('pembelian_souvenir_id')->references('id')->on('pembelian_souvenir')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_souvenir');
    }
};
