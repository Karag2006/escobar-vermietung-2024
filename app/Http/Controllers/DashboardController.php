<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Trailer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private function GetNextReservations() {
        $currentDate = Carbon::today();
        $reservations = Document::with('collectAddress:id,name')
        ->where('current_state', 'reservation')
        ->where('collect_at', '>=', $currentDate)
        ->orderBy('collect_at', 'ASC')
        ->limit(5)
        ->get();

        return $reservations;
    }

    private function getNextInspectionTrailers() {
        $currentMonth = Carbon::today()->startOfMonth();
        $due = Trailer::where('inspection_at', '<=', $currentMonth)
        ->orderBy('inspection_at', 'ASC')
        ->get();

        $currentCount = $due ? count($due) : 0;
        if ($currentCount < 5) {
            $nextDue = Trailer::where('inspection_at', '>', $currentMonth)
            ->orderBy('inspection_at', 'ASC')
            ->limit(5 - $currentCount)
            ->get();

            $due = $due->merge($nextDue);
        }

        return $due;
    }



    public function index() {
        $nextReservations = $this->GetNextReservations();
        $nextDueTrailers = $this->getNextInspectionTrailers();
        return Inertia::render('Dashboard/index', [
            'nextReservations' => $nextReservations,
            'nextDueTrailers' => $nextDueTrailers
        ]);
    }
}
