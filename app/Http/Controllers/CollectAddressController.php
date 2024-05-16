<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCollectAddressRequest;
use App\Http\Requests\UpdateCollectAddressRequest;
use App\Models\CollectAddress;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CollectAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collectAddressList = CollectAddress::select('id', 'name', 'address')->orderBy('name')->get();
        return response()->json($collectAddressList, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectAddressRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CollectAddress $collectAddress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CollectAddress $collectAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectAddressRequest $request, CollectAddress $collectAddress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CollectAddress $collectAddress)
    {
        //
    }
}
