<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Resources\DocumentResource;
use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Inertia\Inertia;

class ContractController extends Controller
{
    private function getNextNumber()
    {
        $number = 465382;
        $document = Document::select('contract_number')
            ->orderBy('contract_number', 'desc')
            ->first();
        if ($document) {
            $number = $document->contract_number + 1;
        }
        return $number;
    }

    public function getHighestNumber()
    {

        return response()->json($this->getNextNumber(), Response::HTTP_OK);
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

            $output['contract_number'] = $this->getNextNumber();
            $output['current_state'] = "contract";
            $output['contract_date'] = $today;
        }

        return $output;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 27.10.2024 - Fix/DatesAndTimes :
        // collect_at and return_at added to the List

        // 03.11.2024 Feature: Add Archive functionality
        // Removed the archived documents from the list
        // Restructured code to allow users to send parameter to show archived documents
        $query = Document::query();
        $query->with('collectAddress:id,name');
        $query->select('id', 'is_archived', 'contract_number', 'collect_date', 'collect_at', 'return_at', 'return_date', 'customer_name1', 'vehicle_title', 'vehicle_plateNumber', 'collect_address_id', "current_state");
        $query->where('current_state', 'contract');

        $showArchived = request('showArchived', false);

        if (!$showArchived || $showArchived != 'true') {
            $query->where('is_archived', false);
        }

        $contractList = $query->orderBy('contract_number', 'desc')->get();

        $headerValue = intval($request->header('Forwarddocument'));
        if ($headerValue > 0)
        {
            return Inertia::render('Document/index', [
                'contractList' => $contractList,
                'type' => 'contract',
                'ForwardDocument' => $headerValue
            ]);
        }

        return Inertia::render('Document/index', [
            'contractList' => $contractList,
            'type' => 'contract',
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContractRequest $request)
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
    public function update(UpdateContractRequest $request, Document $document)
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
