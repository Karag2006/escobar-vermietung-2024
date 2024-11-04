<?php

use App\Console\Commands\ArchiveDocuments;
use Illuminate\Support\Facades\Schedule;

Schedule::command(ArchiveDocuments::class)
    ->timezone('Europe/Berlin')
    ->dailyAt('02:30')
    ->withoutOverlapping();
