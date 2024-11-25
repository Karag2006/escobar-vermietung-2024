<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{

    // Translate the input into the form that the Database Requires.
    // (should happen after Data validation, use Store and Update Requests for validation.)
    private function useInput($input, $mode, $type)
    {
        $output = [];
        $customer = $input['customer'];
        $driver = $input['driver'];
        $trailer = $input['trailer'];
        $data = $input['data'];
        $settings = $input['settings'];

        foreach ($customer as $key => $value) {
            $output['customer_' . $key] = $value;
        }
        foreach ($driver as $key => $value) {
            $output['driver_' . $key] = $value;
        }
        foreach ($trailer as $key => $value) {
            $output['vehicle_' . $key] = $value;
        }
        foreach ($data as $key => $value) {
            $output[$key] = $value;
        }
        foreach ($settings as $key => $value) {
            $output[$key] = $value;
        }

        // 04.11.2024 : Feature - Add Archive Functionality
        // an archived document can be unarchived by updating it
        if (!!$output['is_archived']) {
            $output['is_archived'] = false;
        }

        // 22.10.2024 Fix: Add collect_at and return_at columns for collision checks
        // 27.10.2024 Fix/DatesAndTimes : This might be the place where timezone issues are coming from.
        if(!$output['collect_at'])
        {
            $collectDateTime = Carbon::createFromFormat($output['collect_date'] . ' ' . $output['collect_time'], config('custom.date_format'). ' ' . config('custom.time_format'), 'Europe/Berlin');
            $output['collect_at'] = $collectDateTime;
        }
        else {
            $output['collect_at'] = Carbon::parse($output['collect_at']);
        }
        if(!$output['return_at'])
        {
            $returnDateTime = Carbon::createFromFormat($output['return_date'] . ' ' . $output['return_time'], config('custom.date_format'). ' ' . config('custom.time_format'), 'Europe/Berlin');
            $output['return_at'] = $returnDateTime;
        }
        else {
            $output['return_at'] = Carbon::parse($output['return_at']);
        }

        if ($mode == 'new') {

            $output['user_id'] = Auth::id();

            $today = Carbon::today()->format('d.m.Y');
            $output['selectedEquipmentList'] = json_encode($output['selectedEquipmentList']);

            $output['reservation_number'] = $this->getNextNumber($type, 265382);
            $output['current_state'] = "reservation";
            $output['reservation_date'] = $today;
            $output['contract_bail'] = 100.0;
        }

        return $output;
    }

    public function getHighestNumber()
    {

        return response()->json($this->getNextNumber('reservation', 265382), Response::HTTP_OK);
    }

    private function getNextNumber($type, $default){
        $propertyName = $type."_number";
        $document = Document::select($propertyName)
            ->orderByRaw("CASE WHEN ".$propertyName." IS NULL THEN 0 ELSE 1 END DESC")
            ->orderBy($propertyName, 'desc')
            ->first();
        if($document) {
            return max(($document->{$propertyName} + 1), $default);
        }
        return $default;
    }


    private function getISODate($value){
        return $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    // 22.10.2024 Fix: Adding this function to work with DateTime Objects instead of just Dates in string format.
    private function getDateTimeObject($date, $time){
        return $date ? Carbon::createFromFormat('d.m.Y H:i', $date.' '.$time) : null;
    }

    public function collisionCheckData(Document $document) {
        return response()->json($document->only([
            'vehicle_id',
            'collect_date',
            'return_date',
            'collect_time',
            'return_time'
        ]), Response::HTTP_OK);
    }

    // function to check if the current Document, potentially conflicts with any other Document on File.
    // Only checks Dates and to be sure will call potential conflict even if the other Document only overlaps in the collect- or return Date.


    // 22.10.2024 Fix: This function works, but needs to to take times into account as well for the Month List to work properly.
    //                 The request needs to be changed to include collect_time and return_time as well.

    public function collisionCheck(Request $request) {

        if (!$request['vehicle_id'] ||
            !$request['collect_date'] ||
            !$request['return_date'] ||
            //  22.10.2024 Fix: Adding the time to the required fields.
            // WARNING: Frontend needs to be adjusted to send the time as well.
            !$request['collect_time'] ||
            !$request['return_time']
        )
        return response()->json(null, Response::HTTP_UNPROCESSABLE_ENTITY);

        // 22.10.2024 Fix: Old functionality:
        // $collectDate = $this->getISODate($request['collect_date']);
        // $returnDate = $this->getISODate($request['return_date']);
        // $currentDate = Carbon::today()->format('Y-m-d');

        // 22.10.2024 Fix: New functionality using DateTime Objects:
        if(!$request['collect_at'])
            $collectDate = $this->getDateTimeObject($request['collect_date'], $request['collect_time']);
        else $collectDate = Carbon::parse($request['collect_at']);

        if(!$request['return_at'])
            $returnDate = $this->getDateTimeObject($request['return_date'], $request['return_time']);
        else $returnDate = Carbon::parse($request['return_at']);
        $currentDate = Carbon::now();


        // Requirements for collisions with Document:
        //     - Document is not this document itself
        //     - Document rental period is not already in the past.
        //     - Document deals with the same Trailer
        //     - Document is not Archived
        //     - Document's collect Date happens before this documents return Date
        //      && Document's return Date happens after this documents collect Date.
        $collisionDocument = Document::where('id', "!=", $request['id'])
            ->where('return_at', '>=', $currentDate)
            ->where('vehicle_id', $request['vehicle_id'])
            ->where('is_archived', false)
            ->where(function ($query) use($collectDate, $returnDate){
                $query->where('collect_at', '<', $returnDate)
                ->where('return_at', '>', $collectDate);
            })->first();


        if(!$collisionDocument) return response()->json(['collision' => 'no'], Response::HTTP_OK);

        // Collecting Data about the conflicting Document to give the User enough information to decide to ignore the Conflict or do something about it.
        $data = [
            'collision' => 'yes',
            // 'collisionData' => new DocumentResource($collisionDocument)
            'collisionData' => [
                'documentType' => $collisionDocument['current_state'],
                'documentNumber' => $collisionDocument[$collisionDocument['current_state'].'_number'],
                'startDate' => $collisionDocument['collect_date'],
                'endDate' => $collisionDocument['return_date'],
                'startTime' => $collisionDocument['collect_time'],
                'endTime' => $collisionDocument['return_time'],
                'collect_at' => $collisionDocument['collect_at'],
                'return_at' => $collisionDocument['return_at'],
                'customerName' => $collisionDocument['customer_name1'],
                'reservationFeePayed' => $collisionDocument['reservation_deposit_recieved'],
                'reservationFeeDate' => $collisionDocument['reservation_deposit_date']
            ]
        ];
        return response()->json($data, Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return new DocumentResource($document);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $data = $this->useInput($request->input(), 'new', 'reservation');
        $document = Document::create($data);
        return response()->json($document, Response::HTTP_CREATED);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $data = $this->useInput($request->input(), 'update', $request->current_state);
        $document->update($data);
        return response()->json($document, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();
        return response()->json(['status' => "deleted"], Response::HTTP_OK);
    }

    public function downloadPDF(Document $document)
    {
        if ($document->current_state === 'offer') {
            $DEtype = "Angebot";
            $number = $document->offer_number;
            $documentDate = $document->offer_date;
            $note = $document->offer_note;
            $user = $document->user->name;
        }
        if ($document->current_state === 'reservation') {
            $DEtype = "Reservierung";
            $number = $document->reservation_number;
            $documentDate = $document->reservation_date;
            $note = $document->reservation_note;
            $user = $document->user->name;
        }
        if ($document->current_state === 'contract') {
            $DEtype = "Mietvertrag";
            $number = $document->contract_number;
            $documentDate = $document->contract_date;
            $note = $document->contract_note;
            $user = $document->user->name;
        }

        $yearShort = Carbon::createFromFormat('d.m.Y', $documentDate)->format('y');

        $data = [
            'document' => $document,
            'number' => $number,
            'DEtype' => $DEtype,
            'documentDate' => $documentDate,
            'note' => $note,
            'user' => $user,
            'yearShort' => $yearShort,
        ];

        $pdf = Pdf::loadView('DocumentToPDF', $data);
        $fileName = $document->current_state . '/' . $number . '.pdf';
        Storage::disk('public')->put($fileName, $pdf->download()->getOriginalContent());
        $generatedPDFLink = asset('storage/' . $fileName);

        return response()->json($generatedPDFLink, Response::HTTP_OK);
    }

    public function forwardDocument(Request $request, Document $document){
        $currentDate = Carbon::today()->format('d.m.Y');
        $nextDocumentType = "";
        if ($document->current_state == 'offer') {
            $nextDocumentType = 'reservation';
            $nextDocumentDefaultNumber = 1;
        }
        else {
            $nextDocumentType = 'contract';
            $nextDocumentDefaultNumber = 1;
        }

        $newNumber = $this->getNextNumber($nextDocumentType, $nextDocumentDefaultNumber);

        $request[$nextDocumentType.'_number'] = $newNumber;
        $request[$nextDocumentType.'_date'] = $currentDate;
        $request['current_state'] = $nextDocumentType;
        // The $request is supposed to be empty at start,
        // so to make sure no one can insert data thats not supposed to be there,
        // limit the update to only the parameters we just set.
        $document->update($request->only([$nextDocumentType.'_number', $nextDocumentType.'_date', 'current_state']));

        $document = $document->only([
            'id',
            'reservation_number',
            'contract_number',
            'current_state',
            'collect_date',
            'return_date',
            'customer_name1',
            'vehicle_title',
            'vehicle_plateNumber',
            'selectedEquipmentList'
        ]);

        return response()->json(
            $document,
            Response::HTTP_OK
        );
    }

    public function toggleArchive(Document $document, Request $request)
    {
        // 04.11.2024 Feature: Add Archive functionality
        // Toggle the is_archived value of the document.
        $document->update(['is_archived' => !$document->is_archived]);
        return response()->json($document, Response::HTTP_OK);
    }

    public static function archiveDocuments()
    {
        // 03.11.2024 Feature: Add Archive functionality
        // Documents to be archived need to pass all the following conditions:
            // - Document is not already archived
            // - Document is offer or reservation
                //  Offers :
                //  - reservation Deposit is not payed
                //  - reservation Deposit Date is in the past

                //  Reservations:
                // - Collect Date is in the past

        $today = Carbon::today();
        $todayString = $today->format("Y-m-d");

        $documents = Document::where('is_archived', false)
            ->where(function ($query) use($todayString) {
                $query->where('current_state', 'offer')
                    ->where('reservation_deposit_recieved', false)
                    ->where('reservation_deposit_date', '<', $todayString);
            })
            ->orWhere(function ($query) use($today) {
                $query->where('current_state', 'reservation')
                    ->where('collect_at', '<', $today);
            })
            ->orWhere(function ($query) use($today) {
                $query->where('current_state', 'offer')
                    ->where('collect_at', '<', $today);
            })
            ->get();
        // dd('ArchiveDocuments function called : ', $documents);
        foreach ($documents as $document) {
            $document->update(['is_archived' => true]);
        }

    }
}
