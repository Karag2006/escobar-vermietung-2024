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
    
    Route::get('api/nav', [NavController::class, 'index']);
});

require __DIR__.'/auth.php';
