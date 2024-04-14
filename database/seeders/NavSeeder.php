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
        $navs = [
            [
                'id'                => 1,
                'name'              => 'Dashboard',
                'icon'              => 'circle-gauge',
                'link'              => 'dashboard',
            ],
            // [
            //     'id'                => 2,
            //     'name'              => 'Kunden',
            //     'icon'              => 'users-round',
            //     'link'              =>  'dashboard',
            // ],
            // [
            //     'id'                => 3,
            //     'name'              => 'Angebote',
            //     'icon'              => 'fas fa-id-card-alt',
            //     'link'              => '/offers',
            // ],
            // [
            //     'id'                => 4,
            //     'name'              => 'Reservierungen',
            //     'icon'              => 'fas fa-address-card',
            //     'link'              => '/reservations',
            // ],
            // [
            //     'id'                => 5,
            //     'name'              => 'Mietverträge',
            //     'icon'              => 'fas fa-file-signature',
            //     'link'              => '/contracts',
            // ],
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
            // [
            //     'id'                => 10,
            //     'name'              => 'Anhänger',
            //     'icon'              => 'fas fa-trailer',
            //     'link'              => '/trailers',
            //     'isChild'           => true
            // ],
            // [
            //     'id'                => 11,
            //     'name'              => 'Zubehör',
            //     'icon'              => 'fas fa-sitemap',
            //     'link'              => '/equipment',
            //     'isChild'           => true
            // ],
            // [
            //     'id'                => 12,
            //     'name'              => 'Einstellungen',
            //     'icon'              => 'fas fa-cogs',
            //     'link'              => '/options',
            // ],

        ];

        foreach($navs as $link) {
            Nav::create($link);
        }
    }
}
