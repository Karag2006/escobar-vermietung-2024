<?php
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::get('/customer', [CustomerController::class, 'index'])->name('customer'); // List all Customers
Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store'); // Store new Customer
Route::get('/customer/{customer}', [CustomerController::class, 'show'])->name('customer.show'); // Get single customer by ID
Route::patch('/customer/{customer}', [CustomerController::class, 'update'])->name('customer.update'); // update existing Customer
Route::delete('/customer/{customer}', [CustomerController::class, 'destroy'])->name('customer.delete'); // delete existing Customer

// get Customer Selector List
Route::get('/selector/customer', [CustomerController::class, 'getSelector'])->name('customer.selector')
?>