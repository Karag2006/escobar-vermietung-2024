<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\Nav;

class NavSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nav::truncate();

        $navs = [
            [
                'id'                => 1,
                'name'              => 'Dashboard',
                'icon'              => 'circle-gauge',
                'link'              => 'dashboard',
            ],
            [
                'id'                => 2,
                'name'              => 'Kunden',
                'icon'              => 'users-round',
                'link'              =>  'customer',
            ],
            [
                'id'                => 3,
                'name'              => 'Angebote',
                'icon'              => 'book-open',
                'link'              => 'offer',
            ],
            [
                'id'                => 4,
                'name'              => 'Reservierungen',
                'icon'              => 'book-open-check',
                'link'              => 'reservation',
            ],
            [
                'id'                => 5,
                'name'              => 'Mietverträge',
                'icon'              => 'book-open-text',
                'link'              => 'contract',
            ],
            [
                'id'                => 6,
                'name'              => 'Benutzerverwaltung',
                'icon'              => 'users-round',
                'link'              =>  'user',
            ],
            // [
            //     'id'                => 9,
            //     'name'              => 'Anhängerverwaltung',
            //     'icon'              => 'fas fa-trailer',
            //     'children'          => '10;11'
            // ],
            [
                'id'                => 10,
                'name'              => 'Anhänger',
                'icon'              => 'caravan',
                'link'              => 'trailer'
            ],
            [
                'id'                => 11,
                'name'              => 'Zubehör',
                'icon'              => 'wrench',
                'link'              => 'equipment',
            ],
            [
                'id'                => 12,
                'name'              => 'Einstellungen',
                'icon'              => 'settings',
                'link'              => 'settings',
            ],

        ];

        foreach($navs as $link) {
            Nav::create($link);
        }
    }
}
