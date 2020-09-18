<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\ActivityController;
use App\User;
use App\Need;
use App\CustomerCredential;
use App\OrganizationCredential;
use App\Invoice;
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
    
    /**
     * Need donation
     * 
     * @param request, need
     * @return \Illuminate\Http\Response
     */
    public function donateNeed(
        Request $request, 
        ActivityController $activity, 
        Need $need
    ){
        $org = $need->model;

        $key = OrganizationCredential::where(
                    'organization_id', $org->id
                )
                ->first();

        \Stripe\Stripe::setApiKey($key->secret_key);
        
        $credential = CustomerCredential::where([
                ['user_id', auth()->user()->id],
                ['model_id', $org->id]
            ])
            ->first();

        try {
            if (!$credential) {
                $credential = new CustomerCredential;
    
                if (!$credential->customer_id) {
                    $createdCustomer = \Stripe\Customer::create([
                            'name' => auth()->user()->name,
                            'email' => auth()->user()->email
                        ]);
        
                    $credential->customer_id = $createdCustomer->id;
                }
        
                if (!$credential->card_id) {
                    $card = \Stripe\Customer::createSource(
                            $credential->customer_id,
                            ['source' => $request->token]
                        );
    
                    $credential->card_id = $card->id;
                }
    
                $credential->user_id = auth()->user()->id;
    
                $org->customerCredential()->save($credential);
            }
    
            $description = 'donated to '.$need->title;
    
            $charge = \Stripe\Charge::create([
                    'customer' => $credential->customer_id,
                    'amount' => $request->amount,
                    'currency' => $request->currency,
                    'description' => $description
                ]);

            $uuid = (string) Str::uuid();
    
            $initInvoice = Invoice::make([
                    'user_id' => auth()->user()->id,
                    'receipt' => $uuid,
                    'charge_id' => $charge->id,
                    'description' => $description,
                    'amount' => $request->amount,
                ]);
    
            $invoice = $need->invoices()->save($initInvoice);

            $activity->store($need, [
                    'description' => 'donated to ',
                    'short_description' => $need->title,
                ]);
    
            return response()->json([
                    'message' => 'Successfully donated.',
                    'data' => $invoice
                ], 202);
                
        } catch(\Stripe\Exception\CardException $e) {
            return response()->json([
                'message' => $e->getError()->message,
                'status' => $e->getHttpStatus(),
                'type' => $e->getError()->type,
                'code' => $e->getError()->code,
                'param' => $e->getError()->param,
            ], 403);
        } catch (\Stripe\Exception\RateLimitException $e) {
            return response()->json([
                'message' => 'Too many requests made, too quickly.',
            ], 429);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            return response()->json([
                'message' => "Invalid parameters were supplied.",
            ], 402);
        } catch (\Stripe\Exception\AuthenticationException $e) {
            return response()->json([
                'message' => "Authentication Failed",
            ], 401);
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            return response()->json([
                'message' => "Something went wrong, Please try again.",
            ], 504);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return response()->json([
                'message' => "Something went wrong, Please try again.",
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Server error, Please try again.",
            ], 503);
        }
    }
}
