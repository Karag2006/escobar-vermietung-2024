<?php
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::get('/customer', [CustomerController::class, 'index'])->name('customer'); // List
Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store');

?>