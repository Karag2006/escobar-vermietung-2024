<?php

namespace App\Http\Controllers;

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
        if (!$preSelected) return Inertia::render('Analysis/Index');
        $trailer = Trailer::find($preSelected);
        if (!$trailer) return Inertia::render('Analysis/Index');

        $analysis = $this->makeAnalysis($trailer, now()->subYear(), now());
        if (!$analysis) return Inertia::render('Analysis/Index');

        return Inertia::render('Analysis/Index', [
            'trailer' => $trailer,
            'analysis' => $analysis
        ]);

    }


    public function create(Trailer $trailer, Request $request)
    {
        // This function will create the analysis for the given trailer and date range
    }

    private function makeAnalysis(Trailer $trailer, $start_date, $end_date)
    {
        // This function will create the analysis for the given trailer and date range
        return null;
    }
}
