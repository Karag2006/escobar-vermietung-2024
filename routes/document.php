<?php
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;

Route::post('collisionCheck', [DocumentController::class, 'collisionCheck'])->name('collisionCheck');
?>