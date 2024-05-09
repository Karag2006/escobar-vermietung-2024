<?php
use App\Http\Controllers\TrailerController;
use Illuminate\Support\Facades\Route;

Route::get('/trailer', [TrailerController::class, 'index'])->name('trailer'); // List all Trailers
Route::post('/trailer', [TrailerController::class, 'store'])->name('trailer.store'); // Store new Trailer
Route::get('/trailer/{trailer}', [TrailerController::class, 'show'])->name('trailer.show'); // Get single trailer by ID
Route::patch('/trailer/{trailer}', [TrailerController::class, 'update'])->name('trailer.update'); // update existing Trailer
Route::delete('/trailer/{trailer}', [TrailerController::class, 'destroy'])->name('trailer.delete'); // delete existing Trailer
?>