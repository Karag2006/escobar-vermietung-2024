<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Requests\UpdateLicenseClassesRequest;
use App\Http\Requests\UpdatePaymentTypesRequest;
use App\Models\Setting;
use App\Models\CollectAddress;
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
        $collectAddressList = CollectAddress::select('id', 'name', 'address')->orderBy('name')->get();
        return Inertia::render('Settings/index', [
            'settings' => $settings[0],
            'collectAddressList' => $collectAddressList,
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

    public function showLicenseClasses(Setting $setting) {
        return response()->json(json_decode($setting["license_classes"]), Response::HTTP_OK);
    }
    public function updateLicenseClasses(UpdateLicenseClassesRequest $request, Setting $setting) {

        $setting['license_classes'] = json_encode($request["license_classes"]);
        $setting->save();
    }

    public function showPaymentTypes(Setting $setting) {
        return response()->json(json_decode($setting["payment_types"]), Response::HTTP_OK);
    }

    public function updatePaymentTypes(UpdatePaymentTypesRequest $request, Setting $setting) {
        
        $setting['payment_types'] = json_encode($request["payment_types"]);
        $setting->save();
    }
}
