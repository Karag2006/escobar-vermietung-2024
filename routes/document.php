<?php
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ReservationTableController;
use Illuminate\Support\Facades\Route;

Route::get('collisiondata/{document}', [DocumentController::class, 'collisionCheckData'])->name('collisionCheck.data');
Route::post('collisionCheck', [DocumentController::class, 'collisionCheck'])->name('collisionCheck');
Route::get('document/{document}', [DocumentController::class, 'downloadPDF'])->name('downloadPDF');
Route::patch('document/{document}', [DocumentController::class, 'forwardDocument'])->name('forwardDocument');

Route::get('document/general/{document}', [DocumentController::class, 'show'])->name('document.show');
Route::post('document/general', [DocumentController::class, 'store'])->name('document.store');
Route::patch('document/general/{document}', [DocumentController::class, 'update'])->name('document.update');
Route::delete('document/general/{document}', [DocumentController::class, 'destroy'])->name('document.delete');

Route::get('reservationtable/{month}', [ReservationTableController::class, 'index'])->name('reservationTable');

// 04.11.2024 : Feature - Add Archive Functionality
Route::patch('archive/{document}', [DocumentController::class, 'toggleArchive'])->name('archive.toggle');
?>
