<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    // Handling Document Numbers seperated from Document->id
    // to allow user chosen number cycles for each Document Type
    private function getNextNumber()
    {
        $number = 26538;
        $document = Document::select('offer_number')
            ->orderBy('offer_number', 'desc')
            ->first();
        if ($document) {
            $number = $document->offer_number + 1;
        }
        return $number;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offerList = Document::with('collectAddress:id,name')
            ->select('id', 'offer_number', 'collect_date', 'return_date', 'customer_name1', 'vehicle_title', 'vehicle_plateNumber', 'collect_address_id')
            ->where('current_state', 'offer')
            ->orderBy('offer_number', 'desc')
            ->get();
        return Inertia::render('Offer/index', [
            'offerList' => $offerList
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
