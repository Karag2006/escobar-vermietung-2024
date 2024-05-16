<?php
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/settings', [SettingController::class, 'index'])->name('settings'); // List all Settings
Route::post('/settings', [SettingController::class, 'store'])->name('settings.store'); // Store new Setting
Route::get('/settings/{setting}', [SettingController::class, 'show'])->name('settings.show'); // Get single setting by ID
Route::patch('/settings/{setting}', [SettingController::class, 'update'])->name('settings.update'); // update existing Setting
Route::delete('/settings/{setting}', [SettingController::class, 'destroy'])->name('settings.delete'); // delete existing Setting
?>