<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NavController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard');

require __DIR__.'/auth.php';

Route::get('/json', [DashboardController::class, 'jsonConverter'])->name('json');

// Routes requiring users to be authenticated
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('api/nav', [NavController::class, 'index']);

    require __DIR__.'/user.php';
    require __DIR__.'/profile.php';
    require __DIR__.'/customer.php';
    require __DIR__.'/trailer.php';
    require __DIR__.'/equipment.php';
    require __DIR__.'/settings.php';
    require __DIR__.'/collect-addresses.php';
    require __DIR__.'/offer.php';
    require __DIR__.'/reservation.php';
    require __DIR__.'/contract.php';
    require __DIR__.'/document.php';
    require __DIR__.'/analysis.php';

});

