<?php
use App\Http\Controllers\ContractController;
use Illuminate\Support\Facades\Route;

Route::get('/contract', [ContractController::class, 'index'])->name('contract'); // List all Contracts
Route::post('/contract', [ContractController::class, 'store'])->name('contract.store'); // Store new Contract
Route::get('/contract/{document}', [ContractController::class, 'show'])->name('contract.show'); // Get single contract by its Document->id
Route::patch('/contract/{document}', [ContractController::class, 'update'])->name('contract.update'); // update existing Contract
Route::delete('/contract/{document}', [ContractController::class, 'destroy'])->name('contract.delete'); // delete existing Contract
?>