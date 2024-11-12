<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Http\Resources\EquipmentResource;
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
        $result = new EquipmentResource($equipment);
        return response()->json($result, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        $equipment->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
    }

    public function apiIndex()
    {
        $equipmentList = Equipment::select('id', 'name', 'details', 'defaultNumber')->orderBy('name')->get();
        return response()->json($equipmentList, Response::HTTP_OK);
    }
}
