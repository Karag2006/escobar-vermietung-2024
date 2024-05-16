<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Equipment;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipmentList = Equipment::select('id', 'name', 'details', 'defaultNumber')->orderBy('name')->get();
        return Inertia::render('Equipment/index', [
            'equipmentList' => $equipmentList
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request)
    {
        $equipment = Equipment::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipment $equipment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipment $equipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        //
    }
}
