<?php
use App\Http\Controllers\CollectAddressController;
use Illuminate\Support\Facades\Route;

Route::get('/collectaddress', [CollectAddressController::class, 'index'])->name('collectaddress'); // List all Collectaddresses
Route::post('/collectaddress', [CollectAddressController::class, 'store'])->name('collectaddress.store'); // Store new CollectAddress
Route::get('/collectaddress/{collectAddress}', [CollectAddressController::class, 'show'])->name('collectaddress.show'); // Get single collectAddress by ID
Route::patch('/collectaddress/{collectAddress}', [CollectAddressController::class, 'update'])->name('collectaddress.update'); // update existing CollectAddress
Route::delete('/collectaddress/{collectAddress}', [CollectAddressController::class, 'destroy'])->name('collectaddress.delete'); // delete existing CollectAddress
?>