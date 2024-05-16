<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;


class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::first()->get();
        return Inertia::render('Settings/index', [
            'settings' => $settings[0]
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        return response()->json($setting, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        $setting->update($request->all());
    }
}
