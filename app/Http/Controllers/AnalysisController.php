<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Trailer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalysisController extends Controller
{
    public function index(Request $request)
    {
        // This function provides the Inertia page to create and display the analysis
        // Request is optional and can contain a Trailer, in that case the page will be pre-populated with an analysis for that trailer for the last year.
        $preSelected = $request->input('trailer');
        if (!$preSelected) return Inertia::render('Analysis/index');
        $trailer = Trailer::find($preSelected);
        if (!$trailer) return Inertia::render('Analysis/index');

        $analysis = $this->makeAnalysis($trailer, now()->subYear(), now());
        if (!$analysis) return Inertia::render('Analysis/index');

        return Inertia::render('Analysis/index', [
            'trailer' => $trailer,
            'analysis' => $analysis
        ]);

    }


    public function create(Trailer $trailer, Request $request)
    {
        // This function will create the analysis for the given trailer and date range

        $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'required|date'
        ]);

        if ($request->input('start_date') > $request->input('end_date')) {
            return response()->json(['error' => 'The start date must be before the end date'], 422);
        }

        $analysis = $this->makeAnalysis($trailer, $request->input('startDate'), $request->input('endDate'));

        if (!$analysis) return response()->json(['error' => 'keine Daten für diesen Anhängern in diesem Zeitraum.'], 404);

        $data = [
            'trailer' => $trailer,
            'analysis' => $analysis
        ];

        return response()->json($data);
    }

    private function makeAnalysis(Trailer $trailer, $start_date, $end_date)
    {
        // This function will create the analysis for the given trailer and date range
        $documents = Document::where('vehicle_id', $trailer->id)
            ->where('current_state', 'contract')
            ->where('is_archived', false)
            ->where('collect_at', '>=', $start_date)
            ->where('collect_at', '<=', $end_date)
            ->get();

        if (!$documents || $documents->count() <= 0) return null;

        $sum = 0;
        foreach ($documents as $document) {
            $sum += $document->total_price;
        }

        $analysis = [
            'total' => $sum,
            'numberOfContracts' => $documents->count(),
            'contractList'  => $documents
        ];
        return $analysis;
    }
}
