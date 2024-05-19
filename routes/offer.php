<?php
use App\Http\Controllers\OfferController;
use Illuminate\Support\Facades\Route;

Route::get('/offer', [OfferController::class, 'index'])->name('offer'); // List all Offers
Route::post('/offer', [OfferController::class, 'store'])->name('offer.store'); // Store new Offer
Route::get('/offer/{document}', [OfferController::class, 'show'])->name('offer.show'); // Get single offer by its Document->id
Route::patch('/offer/{document}', [OfferController::class, 'update'])->name('offer.update'); // update existing Offer
Route::delete('/offer/{document}', [OfferController::class, 'destroy'])->name('offer.delete'); // delete existing Offer
?>