<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Trailer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private function GetNextReservations($showArchived = false) {
        $currentDate = Carbon::today();

        // 03.11.2024 Feature: Add Archive functionality
        // Removed the archived documents from the list

        $query = Document::query();
        $query->with('collectAddress:id,name');
        $query->where('current_state', 'reservation');
        $query->where('collect_at', '>=', $currentDate);

        if (!$showArchived) {
            $query->where('is_archived', false);
        }

        $reservations = $query->orderBy('collect_at', 'ASC')->limit(5)->get();

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
        $showArchived = request('showArchived', false);
        $showArchived = $showArchived == 'true' ? true : false;
        $nextReservations = $this->GetNextReservations($showArchived);
        $nextDueTrailers = $this->getNextInspectionTrailers();
        return Inertia::render('Dashboard/index', [
            'nextReservations' => $nextReservations,
            'nextDueTrailers' => $nextDueTrailers,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function jsonConverter() {
        return Inertia::render('Json/index');
    }
}
