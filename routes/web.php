<?php

use App\Models\Nav;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NavController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/json', function () {
    return Inertia::render('Json/index');
})->name('json');

// Routes requiring users to be authenticated
Route::middleware('auth')->group(function () {
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

});

require __DIR__.'/auth.php';
