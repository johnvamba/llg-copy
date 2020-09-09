<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Need;
use App\CustomerCredential;
use App\OrganizationCredential;
use DB;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function donateNeed(Request $request, Need $need)
    {
        $customer;

        $org = $need->model;

        $key = OrganizationCredential::where(
                    'organization_id', $org->id
                )
                ->first();

        \Stripe\Stripe::setApiKey($key->secret_key);
        
        $credential = CustomerCredential::where(
                    'user_id', auth()->user()->id
                )
                ->first();
        
        if (!$credential) {
            $credential = new CustomerCredential;

            if (!$credential->customer_id) {
                $createdCustomer = \Stripe\Customer::create([
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email
                    ]);
    
                $credential->customer_id = $createdCustomer->id;
            }
    
            if (!$credential->card_number) {
                $credential->customer_id = $request->card_number;
            }

            $credential->user_id = auth()->user()->id;

            $org->customerCredential()->save($credential);
        }

        $card = \Stripe\PaymentMethod::retrieve(
            $request->token,
        );

        if (!$card->customer) {
            $card->attach(['customer' => $customer->id]);
        }

        $charge = \Stripe\Charge::create([
            'source' => $request->token,
            'amount' => $request->amount,
            'currency' => $request->currency,
            'description' => 'test donation'
        ]);

        return response()->json($charge, 202);
    }
}
