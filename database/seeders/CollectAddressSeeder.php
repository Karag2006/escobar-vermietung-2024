<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CollectAddress;
use Illuminate\Database\Seeder;

class CollectAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $addresses = [
            [
                'name'              => 'Horhausen',
                'address'           => 'Industriepark 13 - 56593 Horhausen',
            ],
            [
                'name'              => 'Hennef',
                'address'           => 'Reisertstraße 9 - 53773 Hennef/Sieg',
            ],
            [
                'name'              => 'Knipp',
                'address'           => 'Meysstraße 8 - 53773 Hennef/Sieg',
            ],
        ];
        foreach ($addresses as $address) {
            CollectAddress::create($address);
        }
    }
}
