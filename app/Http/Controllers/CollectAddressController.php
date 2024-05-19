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
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectAddressRequest $request)
    {
        $address = CollectAddress::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(CollectAddress $collectAddress)
    {
        return response()->json($collectAddress, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectAddressRequest $request, CollectAddress $collectAddress)
    {
        $collectAddress->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CollectAddress $collectAddress)
    {
        $collectAddress->delete();
    }
}
