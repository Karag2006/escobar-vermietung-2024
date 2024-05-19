<?php
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/settings', [SettingController::class, 'index'])->name('settings'); // List all Settings
Route::get('/settings/{setting}', [SettingController::class, 'show'])->name('settings.show'); // Get single setting by ID
Route::patch('/settings/{setting}', [SettingController::class, 'update'])->name('settings.update'); // update existing Setting

// License Classes Routes
Route::get('settings/licenseclasses/{setting}', [SettingController::class, 'showLicenseClasses'])->name('licenseClasses.get');
Route::patch('settings/licenseclasses/{setting}', [SettingController::class, 'updateLicenseClasses'])->name('licenseClasses.update');

// Payment Types Routes
Route::get('settings/paymenttypes/{setting}', [SettingController::class, 'showPaymentTypes'])->name('paymentTypes.get');
Route::patch('settings/paymenttypes/{setting}', [SettingController::class, 'updatePaymentTypes'])->name('paymentTypes.update');
?>