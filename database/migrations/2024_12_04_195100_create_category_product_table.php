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
        Schema::create('category_watches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('watch_id')->constrained('watches', 'watch_id')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories', 'category_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('category_watches', function (Blueprint $table){
            $table->dropForeign(['watch_id']);
            $table->dropForeign(['category_id']);
        });

        Schema::dropIfExists('category_watches');
    }
};
