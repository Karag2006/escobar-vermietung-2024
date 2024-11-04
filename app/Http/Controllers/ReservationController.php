<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Resources\DocumentResource;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Inertia\Inertia;

class ReservationController extends Controller
{

    private function getNextNumber()
    {
        $number = 265382;
        $document = Document::select('reservation_number')
            ->orderBy('reservation_number', 'desc')
            ->first();
        if ($document) {
            $number = $document->reservation_number + 1;
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

        // 04.11.2024 : Feature - Add Archive Functionality
        // an archived document can be unarchived by updating it
        if (!!$output['is_archived']) {
            $output['is_archived'] = false;
        }

        // 22.10.2024 Fix: Add collect_at and return_at columns for collision checks
        // 27.10.2024 Fix/DatesAndTimes : This might be the place where timezone issues are coming from.
        if(!$output['collect_at'])
        {
            $collectDateTime = Carbon::createFromFormat($output['collect_date'] . ' ' . $output['collect_time'], config('custom.date_format'). ' ' . config('custom.time_format'), 'Europe/Berlin');
            $output['collect_at'] = $collectDateTime;
        }
        else {
            $output['collect_at'] = Carbon::parse($output['collect_at']);
        }
        if(!$output['return_at'])
        {
            $returnDateTime = Carbon::createFromFormat($output['return_date'] . ' ' . $output['return_time'], config('custom.date_format'). ' ' . config('custom.time_format'), 'Europe/Berlin');
            $output['return_at'] = $returnDateTime;
        }
        else {
            $output['return_at'] = Carbon::parse($output['return_at']);
        }

        if ($mode == 'new') {

            $output['user_id'] = Auth::id();

            $today = Carbon::today()->format('d.m.Y');
            $output['selectedEquipmentList'] = json_encode($output['selectedEquipmentList']);

            $output['reservation_number'] = $this->getNextNumber();
            $output['current_state'] = "reservation";
            $output['reservation_date'] = $today;
            $output['contract_bail'] = 100.0;
        }

        return $output;
    }

    public function getHighestNumber()
    {

        return response()->json($this->getNextNumber(), Response::HTTP_OK);
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 27.10.2024 - Fix/DatesAndTimes :
        // collect_at and return_at added to the List
        // order changed to collect_at

        // 03.11.2024 Feature: Add Archive functionality
        // Removed the archived documents from the list
        // Restructured code to allow users to send parameter to show archived documents

        $query = Document::query();
        $query->with('collectAddress:id,name');
        $query->select('id', 'is_archived',  'reservation_number', 'collect_date', 'return_date', 'collect_at', 'return_at', 'customer_name1', 'vehicle_title', 'vehicle_plateNumber', 'collect_address_id', "current_state");
        $query->where('current_state', 'reservation');

        $showArchived = request('showArchived', false);
        if (!$showArchived || $showArchived != 'true') {
            $query->where('is_archived', false);
        }

        $reservationList = $query->orderBy('collect_at', 'asc')->get();

        $headerValue = intval($request->header('Forwarddocument'));
        if ($headerValue > 0)
        {
            return Inertia::render('Document/index', [
                'reservationList' => $reservationList,
                'type' => 'reservation',
                'ForwardDocument' => $headerValue
            ]);
        }
        return Inertia::render('Document/index', [
            'reservationList' => $reservationList,
            'type' => 'reservation',
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
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
    public function update(UpdateReservationRequest $request, Document $document)
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
