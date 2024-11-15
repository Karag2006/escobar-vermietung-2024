<?php
return [
    // Datums Format für die Datenbank. wird von den date input feldern automatisch umgeschrieben ins Deutsche Format
    'date_format'         => 'd.m.Y',
    // Für Tüv braucht man nur Jahr und Monat.
    'tuev_format'         => 'm/y',
    'time_format'         => 'H:i',

    'db_date_format'      => 'Y-m-d',
    'db_time_format'      => 'H:i:s',


    'primary_language'    => 'de',
    'available_languages' => [
        'de' => 'German',
    ],
];
