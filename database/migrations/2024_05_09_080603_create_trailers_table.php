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
        Schema::create('trailers', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('plateNumber');
            $table->string('chassisNumber')->nullable();
            $table->string('totalWeight')->nullable();
            $table->string('usableWeight')->nullable();
            $table->string('loading_size')->nullable();
            $table->date('tuev')->nullable();
            $table->longText('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trailers');
    }
};
