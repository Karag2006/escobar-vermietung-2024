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

    // private function getNextInspectionTrailers() {
    //     $currentMonth = Carbon::today()->startOfMonth();
    //     $due = Trailer::where()
    // }

    public function index() {
        $nextReservations = $this->GetNextReservations();
        return Inertia::render('Dashboard', ['nextReservations' => $nextReservations]);
    }
}
