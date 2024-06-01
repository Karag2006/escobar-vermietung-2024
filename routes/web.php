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

// Routes requiring users to be authenticated
Route::middleware('auth')->group(function () {
    //Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // User Routes
    Route::get('/user', [UserController::class, 'index'])->name('user'); // List
    Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show'); // Get Single user by ID
    Route::post('/user', [UserController::class, 'store'])->name('user.store'); // Store
    Route::patch('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.delete');

    require __DIR__.'/customer.php';
    require __DIR__.'/trailer.php';
    require __DIR__.'/equipment.php';
    require __DIR__.'/settings.php';
    require __DIR__.'/collect-addresses.php';
    require __DIR__.'/offer.php';
    require __DIR__.'/reservation.php';
    require __DIR__.'/contract.php';
    
    Route::get('api/nav', [NavController::class, 'index']);
});

require __DIR__.'/auth.php';
