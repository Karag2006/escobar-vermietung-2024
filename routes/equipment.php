<?php
use App\Http\Controllers\EquipmentController;
use Illuminate\Support\Facades\Route;

Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment'); // List all Equipment with Inertia Response.
Route::post('/equipment', [EquipmentController::class, 'store'])->name('equipment.store'); // Store new Equipment
Route::get('/equipment/{equipment}', [EquipmentController::class, 'show'])->name('equipment.show'); // Get single equipment by ID
Route::patch('/equipment/{equipment}', [EquipmentController::class, 'update'])->name('equipment.update'); // update existing Equipment
Route::delete('/equipment/{equipment}', [EquipmentController::class, 'destroy'])->name('equipment.delete'); // delete existing Equipment

Route::get('/api/equipment', [EquipmentController::class, 'apiIndex'])->name('equipment.api.getall');
// List all Equipment with JSON Response
?>