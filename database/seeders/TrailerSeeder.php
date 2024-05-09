<?php

namespace Database\Seeders;

use App\Models\Trailer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrailerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trailer::factory()->count(10)->create();
    }
}
