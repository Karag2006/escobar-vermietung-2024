<?php
use App\Http\Controllers\TrailerController;
use Illuminate\Support\Facades\Route;

Route::get('/trailer', [TrailerController::class, 'index'])->name('trailer'); // List all Trailers
Route::post('/trailer', [TrailerController::class, 'store'])->name('trailer.store'); // Store new Trailer
Route::get('/trailer/{trailer}', [TrailerController::class, 'show'])->name('trailer.show'); // Get single trailer by ID
Route::patch('/trailer/{trailer}', [TrailerController::class, 'update'])->name('trailer.update'); // update existing Trailer
Route::delete('/trailer/{trailer}', [TrailerController::class, 'destroy'])->name('trailer.delete'); // delete existing Trailer

// get Tuev Date for specific Trailer
Route::get('/tuev/{trailer}', [TrailerController::class, 'getTuev'])->name('trailer.tuev');

// 05.11.2024 Feature: Inspection List
// route for: update Inspection Date for specific Trailer by adding 1 or 2 years.
Route::patch('/tuev/{trailer}', [TrailerController::class, 'inspectionPlusYears'])->name('trailer.tuev.update');

// get Trailer Selector List
Route::get('/selector/trailer', [TrailerController::class, 'getSelector'])->name('trailer.selector')
?>
