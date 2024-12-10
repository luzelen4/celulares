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
        Schema::create('phones', function (Blueprint $table) {
            $table->id('celular_id');
            $table->string('nombre_celular');
            $table->string('slug')->unique();
            $table->text('descripcion');
            $table->decimal('precio', 10, 2);
            $table->string('marca');
            $table->integer('cantidad_en_bodega')->default(0);
            $table->string('url_imagen');
            $table->unsignedBigInteger('cod_categoria');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('celulares');
    }
};
