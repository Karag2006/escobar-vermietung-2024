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

        // 03.11.2024 Feature: Add Archive functionality
        // Removed the archived documents from the list
        $reservations = Document::with('collectAddress:id,name')
        ->select('id', 'is_archived', 'reservation_number', 'offer_number', 'contract_number', 'current_state', 'total_price', 'customer_name1', 'vehicle_id', 'vehicle_title', 'vehicle_plateNumber', 'collect_at', 'return_at', 'collect_address_id')
        ->where('is_archived', false)
        ->whereDate('collect_at', '<=', $targetMonthEnd)
        ->whereDate('return_at', '>=', $targetMonthBegin)
        ->get();

        // get List of Trailers
        $trailers = Trailer::select('id', 'plateNumber', 'title', 'inspection_at')
        ->orderBy('title', 'ASC')
        ->get();

        return Inertia::render('ReservationTable/index', [
            'reservationList' => $reservations,
            'trailers' => $trailers,
            'month' => $month
        ]);
    }
}
