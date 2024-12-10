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
        Schema::create('category_phones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('celular_id')->constrained('phones', 'celular_id')->onDelete('cascade');
            $table->foreignId('cod_categoria')->constrained('categories', 'cod_categoria')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Categorias_celulares', function (Blueprint $table){
            $table->dropForeign(['celular_id']);
            $table->dropForeign(['cod_categoria']);
        });

        Schema::dropIfExists('Categorias_celulares');
    }
};
