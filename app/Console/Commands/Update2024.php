<?php

namespace App\Console\Commands;

use App\Http\Controllers\DocumentController;
use Illuminate\Console\Command;

class Update2024 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tp24:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the Database from 2022 version to the 2024 version (this version)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating the Database from 2022 version to 2024 version...');

        $this->call('migrate', [
            '--path' => 'database/migrations/update_2024',
        ]);

        $this->call('db:seed', [
            '--class' => 'Update2024Seeder',
        ]);

        $this->info('Database structure updated successfully.');


        $this->info('Updating the Documents...');
        DocumentController::updateDocuments();

        $this->info('Documents updated successfully.');



    }
}
