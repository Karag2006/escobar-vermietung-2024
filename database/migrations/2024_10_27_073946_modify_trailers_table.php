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
        // 22.10.2024 Fix: Add collect_at and return_at columns for collision checks
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
