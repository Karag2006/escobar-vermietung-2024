<?php
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ReservationTableController;
use Illuminate\Support\Facades\Route;

Route::get('collisiondata/{document}', [DocumentController::class, 'collisionCheckData'])->name('collisionCheck.data');
Route::post('collisionCheck', [DocumentController::class, 'collisionCheck'])->name('collisionCheck');
Route::get('document/{document}', [DocumentController::class, 'downloadPDF'])->name('downloadPDF');
Route::patch('document/{document}', [DocumentController::class, 'forwardDocument'])->name('forwardDocument');

Route::get('document/general/{document}', [DocumentController::class, 'show'])->name('getDocument');

Route::get('reservationtable/{month}', [ReservationTableController::class, 'index'])->name('reservationTable');
?>
