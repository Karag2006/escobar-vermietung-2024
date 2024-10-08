<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Trailer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationTableController extends Controller
{
    /**
     * Display the Reservation Table
     */
    public function index(string $month)
    {
        // get list of Documents with the following Criteria:
        // - Document is active during the given Month if:
        //      - Does not end before this month starts
        //      - Does not begin after this month ends


        // translate $month into start and end Dates
        $targetMonthBegin = Carbon::createFromFormat('Y-m-d', $month.'-01');
        $targetMonthEnd = Carbon::createFromFormat('Y-m-d', $month.'-'.$targetMonthBegin->daysInMonth);

        // get List of Documents
        $reservations = Document::with('collectAddress:id,name')
        ->select('reservation_number', 'offer_number', 'contract_number', 'current_state', 'customer_name1', 'vehicle_id', 'vehicle_plateNumber', 'collect_date', 'collect_time', 'return_date', 'return_time', 'collect_address_id')
        ->whereDate('collect_date', '<=', $targetMonthEnd)
        ->whereDate('return_date', '>=', $targetMonthBegin)
        ->get();

        // get List of Trailers
        $trailers = Trailer::select('id', 'plateNumber', 'title')
        ->orderBy('title', 'ASC')
        ->get();

        return Inertia::render('ReservationTable/index', [
            'reservationList' => $reservations,
            'trailers' => $trailers,
            'month' => $month
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


}
