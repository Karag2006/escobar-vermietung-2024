<?php
use Illuminate\Support\Facades\Route;

Route::get('/customer', [CustomerController::class, 'index'])->name('customer'); // List
?>