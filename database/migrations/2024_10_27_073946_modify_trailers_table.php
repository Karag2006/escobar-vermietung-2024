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
        // 27.10.2024 Feature: Inspection List - Add Inspection Date to Trailers
        Schema::table('trailers', function (Blueprint $table) {
            $table->dateTime('inspection_at')->nullable()->after('tuev');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn('inspection_at');
        });
    }
};
