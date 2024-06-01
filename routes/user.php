<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [UserController::class, 'index'])->name('user'); // List all Users
Route::post('/user', [UserController::class, 'store'])->name('user.store'); // Store new User
Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show'); // Get single user by ID
Route::patch('/user/{user}', [UserController::class, 'update'])->name('user.update'); // update existing User
Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.delete'); // delete existing User
?>