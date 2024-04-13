<?php

namespace App\Http\Controllers;

use App\Models\Nav;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class NavController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nav = Nav::all();
        $childrenIds = [];
        $result = [];

        // replace children ID's with the actual children objects in every entry that has children.

        foreach ($nav as $entry){
            if (!$entry['isChild']) {
                array_push($result, $entry);
            }
            if ($entry['children']) {
                $thisParentChildrenIds = explode(";", $entry['children']);
                $thisParentChildren = [];
                foreach ($thisParentChildrenIds as $value) {
                    $intValue = (int)$value;
                    array_push($childrenIds, $intValue);
                    array_push($thisParentChildren, Nav::where('id', $intValue)->first());
                }
                $entry['children'] = $thisParentChildren;
            }
        }

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Nav $nav)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nav $nav)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nav $nav)
    {
        //
    }
}
