<?php

namespace App\Console\Commands;

use App\Http\Controllers\DocumentController;
use Illuminate\Console\Command;

class ArchiveDocuments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documents:archive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check all Documents and archive any old or outdated ones.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DocumentController::archiveDocuments();
    }
}
