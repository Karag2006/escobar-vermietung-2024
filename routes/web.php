<?php

use App\Models\Nav;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NavController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['navs' => Nav::all()->map(function($nav) {return [
        'id' => $nav->id,
        'name' => $nav->name,
        'icon' => $nav->icon,
        'link' => $nav->link,
    ];})]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    Route::get('api/nav', [NavController::class, 'index']);
});

require __DIR__.'/auth.php';
