<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Resources\DocumentResource;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
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

    // Translate the input into the form that the Database Requires.
    // (should happen after Data validation, use Store and Update Requests for validation.)
    private function useInput($input, $mode)
    {
        $output = [];
        $customer = $input['customer'];
        $driver = $input['driver'];
        $trailer = $input['trailer'];
        $data = $input['data'];
        $settings = $input['settings'];

        foreach ($customer as $key => $value) {
            $output['customer_' . $key] = $value;
        }
        foreach ($driver as $key => $value) {
            $output['driver_' . $key] = $value;
        }
        foreach ($trailer as $key => $value) {
            $output['vehicle_' . $key] = $value;
        }
        foreach ($data as $key => $value) {
            $output[$key] = $value;
        }
        foreach ($settings as $key => $value) {
            $output[$key] = $value;
        }

        // 22.10.2024 Fix: Add collectAt and returnAt columns for collision checks
        $collectDateTime = Carbon::parse($output['collect_date'] . ' ' . $output['collect_time']);
        $output['collectAt'] = $collectDateTime;
        $returnDateTime = Carbon::parse($output['return_date'] . ' ' . $output['return_time']);
        $output['returnAt'] = $returnDateTime;

        if ($mode == 'new') {

            $output['user_id'] = Auth::id();

            $today = Carbon::today()->format(config('custom.date_format'));
            $output['selectedEquipmentList'] = json_encode($output['selectedEquipmentList']);
            $output['offer_number'] = $this->getNextNumber();
            $output['current_state'] = "offer";
            $output['offer_date'] = $today;
            $output['contract_bail'] = 100.0;
        }

        return $output;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $offerList = Document::with('collectAddress:id,name')
        ->select('id', 'offer_number', 'collect_date', 'return_date', 'customer_name1', 'vehicle_title', 'vehicle_plateNumber', 'collect_address_id', "current_state")
        ->where('current_state', 'offer')
        ->orderBy('offer_number', 'desc')
        ->get();

        $headerValue = intval($request->header('Forwarddocument'));
        if ($headerValue > 0)
        {

            return Inertia::render('Document/index', [
                'offerList' => $offerList,
                'type' => 'offer',
                'ForwardDocument' => $headerValue
            ]);
        }

        return Inertia::render('Document/index', [
            'offerList' => $offerList,
            'type' => 'offer'

        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfferRequest $request)
    {
        $data = $this->useInput($request->input(), 'new');
        $document = Document::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return new DocumentResource($document);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfferRequest $request, Document $document)
    {
        $data = $this->useInput($request->input(), 'update');
        $document->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();
    }
}
