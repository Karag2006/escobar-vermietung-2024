<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrailerRequest;
use App\Http\Requests\UpdateTrailerRequest;
use App\Models\Trailer;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class TrailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trailers = Trailer::select('id', 'title', 'plateNumber', 'totalWeight', 'usableWeight', 'loading_size', 'tuev')->orderBy('plateNumber')->get();
        return Inertia::render('Trailer/index', [
            'trailers' => $trailers
        ]);
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
    public function store(StoreTrailerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Trailer $trailer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trailer $trailer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrailerRequest $request, Trailer $trailer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trailer $trailer)
    {
        //
    }
}
