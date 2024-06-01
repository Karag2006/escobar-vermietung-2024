<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Symfony\Component\HttpFoundation\Response;

class DocumentController extends Controller
{
    private function getISODate($value){
        return $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    // function to check if the current Document, potentially conflicts with any other Document on File.
    // Only checks Dates and to be sure will call potential conflict even if the other Document only overlaps in the collect- or return Date.
    public function collisionCheck(Request $request) {

        if (!$request['vehicle_id'] ||
            !$request['collect_date'] ||
            !$request['return_date'] ||
            !$request['collect_time'] ||
            !$request['return_time']
        )
        return response()->json(null, Response::HTTP_UNPROCESSABLE_ENTITY);

        $collectDate = $this->getISODate($request['collect_date']);
        $returnDate = $this->getISODate($request['return_date']);
        $currentDate = Carbon::today()->format('Y-m-d');

        // Requirements for collisions with Document:
            // - Document is not the this document itself
            // - Document rental period is not already in the past.
            // - Document deals with the same Trailer
            // - Document's collect Date happens before this documents return Date
            //  && Document's return Date happens after this documents collect Date. 
        $collisionDocument = Document::whereNot('id', $request['id'])
            ->whereNot('return_date', '<', $currentDate)
            ->where('vehicle_id', $request['vehicle_id'])
            ->where(function ($query) use($collectDate, $returnDate){
                $query->where('collect_date', '<=', $returnDate)
                ->where('return_date', '>=', $collectDate);
            })->first();

        if(!$collisionDocument) return response()->json(['collision' => 'no'], Response::HTTP_OK);

        // Collecting Data about the conflicting Document to give the User enough information to decide to ignore the Conflict or do something about it.
        $data = [
            'collision' => 'yes',
            'collisionData' => [
                'documentType' => $collisionDocument['current_state'],
                'documentNumber' => $collisionDocument[$collisionDocument['current_state'].'_number'],
                'startDate' => $collisionDocument['collect_date'],
                'endDate' => $collisionDocument['return_date'],
                'startTime' => $collisionDocument['collect_time'],
                'endTime' => $collisionDocument['return_time'],
                'customerName' => $collisionDocument['customer_name1'],
                'reservationFeePayed' => $collisionDocument['reservation_deposit_recieved'],
                'reservationFeeDate' => $collisionDocument['reservation_deposit_date']
            ]
        ];
        return response()->json($data, Response::HTTP_OK);
    }
}
