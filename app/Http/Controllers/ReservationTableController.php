<?php

namespace App\Http\Controllers;

use App\Models\Document;
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
        // - Document is a Reservation
        // - Reservation is active during the given Month:
        //      - Does not end before this month starts
        //      - Does not begin after this month starts


        // translate into Date
        $targetMonthBegin = Carbon::createFromFormat('Y-m-d', $month.'-01');
        $targetMonthEnd = Carbon::createFromFormat('Y-m-d', $month.'-'.$targetMonthBegin->daysInMonth);

        $reservations = Document::with('collectAddress:id,name')
        ->select('reservation_number', 'customer_name1', 'vehicle_id', 'vehicle_plateNumber', 'collect_date', 'collect_time', 'return_date', 'return_time', 'collect_address_id')
        ->where('current_state','reservation')
        ->whereDate('collect_date', '<=', $targetMonthEnd)
        ->whereDate('return_date', '>=', $targetMonthBegin)
        ->get();

        return Inertia::render('ReservationTable/index', [
            'reservationList' => $reservations,
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
