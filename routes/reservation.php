<?php
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation'); // List all Reservations
Route::post('/reservation', [ReservationController::class, 'store'])->name('reservation.store'); // Store new Reservation
Route::get('/reservation/{document}', [ReservationController::class, 'show'])->name('reservation.show'); // Get single reservation by its Document->id
Route::patch('/reservation/{document}', [ReservationController::class, 'update'])->name('reservation.update'); // update existing Reservation
Route::delete('/reservation/{document}', [ReservationController::class, 'destroy'])->name('reservation.delete'); // delete existing Reservation
?>