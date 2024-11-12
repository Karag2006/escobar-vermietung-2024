<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::select('id', 'name1', 'name2', 'city', 'plz')->orderBy('name1')->get();
        return Inertia::render('Customer/index', [
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $value = new CustomerResource($customer);
        return response()->json($value, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
    }

    public function getSelector() {
        $selectors = Customer::select('id', 'name1', 'name2')->orderBy('name1')->get();
        return response()->json($selectors, Response::HTTP_OK);
    }
}
