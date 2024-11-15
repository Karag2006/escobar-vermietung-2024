<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Trailer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public static function updateDocuments()
    {
        // 14.11.2024 Feature: Add Update functionality
        // für das Update von version 2022 auf 2024 müssen für Dokumente
        // Daten ergänzt werden.

        // 1. Collect Date und Return Date in DateTime Objekte umwandeln
        UpdateController::setTimeStamps();

        // 2. Archivierung von Dokumenten
        DocumentController::archiveDocuments();

        // 3. Archivieren von Dokumenten die nicht mehr vorhandenen Anhängern zugewiesen sind.
        UpdateController::archiveDocumentsWithoutTrailers();

        // 4. Es kann vorkommen, dass Dokumente sich überschneiden.
        // Für die Monatsliste führt das zu schwerwiegenden Fehlern.
        // Dies tritt meist dann auf, wenn z.B. ein Anhänger früher zurückgegeben wird als geplant und dann direkt wieder vermietet wird.
        // Dies tritt eigentlich nur bei Mietverträgen auf.

        // Bei diesen Dokumenten wird return_at auf das collect_at des nachfolgenden Mietvertrags -1 Minute gesetzt.
        // Das sollte die Kollisionen verhindern und die Monatsliste korrekt darstellen.
        UpdateController::fixCollisions();
    }

    private static function setTimeStamps () {
        // Ist status:
        // - Abholinformationen sind auf collect_date und collect_time aufgeteilt
        // - Rückgabeinformationen sind auf return_date und return_time aufgeteilt

        // Soll status:
        // - Abholinformationen sind in collect_at zusammengefasst als DateTime Object
        // - Rückgabeinformationen sind in return_at zusammengefasst als DateTime Object
        $documents = Document::all();

        foreach ($documents as $document) {
            $collectDateTime = Carbon::createFromFormat(config('custom.date_format'). ' ' . config('custom.time_format'), $document->collect_date . ' ' . $document->collect_time, 'Europe/Berlin');
            $returnDateTime = Carbon::createFromFormat(config('custom.date_format'). ' ' . config('custom.time_format'), $document->return_date . ' ' . $document->return_time,  'Europe/Berlin');
            $document->update([
                'collect_at' => $collectDateTime,
                'return_at' => $returnDateTime
            ]);
        }
    }


    private static function archiveDocumentsWithoutTrailers()
    {
        // 15.11.2024 Feature: Add Update functionality
        // 3. Archivieren von Dokumenten die nicht mehr vorhandenen Anhängern zugewiesen sind.

        // Finde id's aller aktuellen Anhänger
        $currentTrailers = Trailer::all()
            ->pluck('id')
            ->toArray();

        // Finde alle Dokumente die nicht mehr existierende Anhänger zugewiesen haben
        $documents = Document::where('is_archived', false)
            ->whereNotIn('vehicle_id', $currentTrailers)
            ->get();

        foreach ($documents as $document) {
            $document->update(['is_archived' => true]);
        }
    }

    private static function fixCollisions() {
        // 15.11.2024 Feature: Add Update functionality

        // Hole eine Liste der aktuellen Anhänger ID's.
        $trailers = Trailer::all()
            ->pluck('id')
            ->toArray();

        foreach ($trailers as $trailer) {
            // Hole alle Mietverträge für den Anhänger in Abholreihenfolge
            $documents = Document::where('current_state', 'contract')
                ->where('is_archived', false)
                ->where('vehicle_id', $trailer)
                ->orderBy('collect_at', 'ASC')
                ->get();

            UpdateController::fixCollisionsForTrailers($documents);
        }
    }

    private static function fixCollisionsForTrailers($documents) {
        $previousDocument = null;
        foreach ($documents as $document) {
            if ($previousDocument) {
                if ($previousDocument->return_at > $document->collect_at) {
                    $previousDocument->update(['return_at' => $document->collect_at->subMinute()]);
                }
            }
            $previousDocument = $document;
        }
    }

    public static function updateTrailers()
    {
        // 14.11.2024 Feature: Add Update functionality
        // für das Update von version 2022 auf 2024 müssen für Trailer
        // Daten ergänzt werden.
        // Ist status:
        // - tuev enthält monat und jahr der nächsten Tüv-Prüfung

        // Soll status:
        // - inspection_at enthält das Datum der nächsten Tüv-Prüfung


        $trailers = Trailer::all();

        foreach ($trailers as $trailer) {
            $inspectionDate = Carbon::createFromFormat(config('custom.tuev_format'), $trailer->tuev, 'Europe/Berlin');
            $inspectionDate->startOfMonth();
            $trailer->update([
                'inspection_at' => $inspectionDate,
            ]);
        }
    }
}
