<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrailerRequest;
use App\Http\Requests\UpdateTrailerRequest;
use App\Http\Resources\TrailerResource;
use App\Models\Trailer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class TrailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $trailers = Trailer::select('id', 'title', 'plateNumber', 'totalWeight', 'usableWeight', 'loading_size', 'tuev', 'inspection_at')->orderBy('plateNumber')->get();

        // 05.11.2024 : Feature Inspection List - Add OpenEdit Header
        $headerValue = intval($request->header('openEdit'));
        if ($headerValue > 0)
        {
            return Inertia::render('Trailer/index', [
                'trailers' => $trailers,
                'openEdit' => $headerValue
            ]);
        }

        return Inertia::render('Trailer/index', [
            'trailers' => $trailers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrailerRequest $request)
    {
        $trailer = Trailer::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Trailer $trailer)
    {
        $result = new TrailerResource($trailer);
        return response()->json($result, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrailerRequest $request, Trailer $trailer)
    {
        if(!$request->inspection_at){
            $request->merge(['inspection_at' => Carbon::createFromFormat('m/y', $request->tuev)]);
        }
        $trailer->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trailer $trailer)
    {
        $id = $trailer->id;
        $trailer->delete();
        return response()->json($id, Response::HTTP_OK);

    }

    public function getTuev(trailer $trailer)
    {
        $trailer = $trailer->only([
            'id',
            'tuev',
            'inspection_at'
        ]);

        return response()->json($trailer, Response::HTTP_OK);
    }

    // 05.11.2024 Feature: Inspection List
    // update Inspection Date for specific Trailer by adding 1 or 2 years.
    public function inspectionPlusYears(Request $request, Trailer $trailer)
    {
        $request->validate([
            'years' => 'required|integer|in:1,2'
        ]);

        // if an inspection is done today, the next inspection is required in 1 or 2 years from this month.
        $inspection = Carbon::now()->startOfMonth()->addYears($request->years);
        $tuev = $inspection->format('m/y');

        $trailer->update([
            'inspection_at' => $inspection,
            'tuev' => $tuev
        ]);

        return response()->json($tuev, Response::HTTP_OK);
    }

    public function getSelector() {
        $selectors = Trailer::select('id', 'plateNumber', 'title')->orderBy('plateNumber')->get();
        return response()->json($selectors, Response::HTTP_OK);
    }

}
