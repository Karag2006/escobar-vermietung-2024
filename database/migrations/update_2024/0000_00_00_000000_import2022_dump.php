<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = File::get(database_path('vermietung.sql'));
        DB::connection()->getPdo()->exec($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
