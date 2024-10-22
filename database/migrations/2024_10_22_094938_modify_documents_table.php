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
        // 22.10.2024 Fix: Add collectAt and returnAt columns for collision checks
        Schema::table('documents', function (Blueprint $table) {
            $table->dateTime('collectAt')->nullable()->after('collect_time');
            $table->dateTime('returnAt')->nullable()->after('return_time');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn('collectAt');
            $table->dropColumn('returnAt');
        });
    }
};
