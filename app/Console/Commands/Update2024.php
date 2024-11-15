<?php

namespace App\Console\Commands;

use App\Http\Controllers\UpdateController;
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

        $this->info('Updating the Database structure...');

        $this->info('Dropping all tables...');

        $this->call('db:wipe', [
            '--force' => true,
        ]);

        $this->call('migrate', [
            '--path' => 'database/migrations/update_2024',
            '--force' => true,
        ]);

        $this->call('db:seed', [
            '--class' => 'Update2024Seeder',
            '--force' => true,
        ]);

        $this->info('Database structure updated successfully.');


        $this->info('Updating the Documents...');
        UpdateController::updateDocuments();

        $this->info('Documents updated successfully.');

        $this->info('Updating the Trailers...');
        UpdateController::updateTrailers();
        $this->info('Trailers updated successfully.');

        $this->info('Database update completed.');

    }
}
