<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\ActivityController;
use App\Jobs\Mail\SendReceipt;
use App\User;
use App\UserProfile;
use App\Need;
use App\Organization;
use App\CustomerCredential;
use App\OrganizationCredential;
use App\Invoice;
use App\NeedMet;
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
        $key = OrganizationCredential::where(
            'organization_id', $need->organization_id
        )
        ->first();

        if (!$key) {
            return response()->json([
                'message' => "Key not found.",
            ], 422);
        }

        \Stripe\Stripe::setApiKey($key->secret_key);

        try {
            $result = DB::transaction(function () use ($request, $need, $activity) {
                $uuid = (string) Str::uuid();
                $description = 'donated to '.$need->title;

                $need->update(['raised' => floatval($need->raised)+floatval($request->amount)]);
                
                $makeNeedMet = NeedMet::make([
                        'need_id' => $need->id,
                        'amount' => floatval($request->amount)
                    ]);

                auth()->user()->needsMet()->save($makeNeedMet);

                $userProfile = UserProfile::where('user_id', auth()->user()->id)
                    ->first();

                $userProfile->update([
                        'amount_given' => $userProfile->amount_given + floatval($request->amount)
                    ]);
                    
                $activity->store($need, [
                    'description' => 'donated ',
                    'short_description' => "$ ". number_format($request->amount, 2),
                ]);

                $charge = \Stripe\Charge::create([
                    'source' => $request->token,
                    'amount' => floatval($request->amount),
                    'currency' => 'usd',
                    'description' => $description
                ]);

                $initInvoice = Invoice::make([
                        'user_id' => auth()->user()->id,
                        'organization_id' => $need->organization_id,
                        'receipt' => $uuid,
                        'charge_id' => $charge->id,
                        'description' => $description,
                        'amount' => $request->amount,
                    ]);

                $invoice = $need->invoices()->save($initInvoice);

                //Email receipt
                dispatch(new SendReceipt($need, auth()->user(), $request->amount));

                return $invoice;
            });

            return response()->json([
                    'message' => 'Successfully donated.',
                    'data' => $result
                ], 202);
                
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 503);
        }
        // $key = OrganizationCredential::where(
        //             'organization_id', $need->organization_id
        //         )
        //         ->first();

        // if (!$key) {
        //     return response()->json([
        //         'message' => "Key not found.",
        //     ], 422);
        // }

        // \Stripe\Stripe::setApiKey($key->secret_key);

        // try {
        //     $result = DB::transaction(function () use ($request, $need, $activity) {
        //         $uuid = (string) Str::uuid();
        //         $description = 'donated to '.$need->title;

        //         $need->update(['raised' => floatval($need->raised)+floatval($request->amount)]);
                
        //         $makeNeedMet = NeedMet::make([
        //                 'need_id' => $need->id,
        //                 'amount' => floatval($request->amount)
        //             ]);

        //         auth()->user()->needsMet()->save($makeNeedMet);

        //         $userProfile = UserProfile::where('user_id', auth()->user()->id)
        //             ->first();

        //         $userProfile->update([
        //                 'amount_given' => $userProfile->amount_given + floatval($request->amount)
        //             ]);
                    
        //         $activity->store($need, [
        //             'description' => 'donated ',
        //             'short_description' => "$ ". number_format($request->amount, 2),
        //         ]);
    
        //         $charge = \Stripe\Charge::create([
        //                 'customer' => $request->customer_id,
        //                 'amount' => floatval($request->amount),
        //                 'currency' => 'usd',
        //                 'description' => $description
        //             ]);

        //         $initInvoice = Invoice::make([
        //                 'user_id' => auth()->user()->id,
        //                 'organization_id' => $need->organization_id,
        //                 'receipt' => $uuid,
        //                 'charge_id' => $charge->id,
        //                 'description' => $description,
        //                 'amount' => $request->amount,
        //             ]);
        
        //         $invoice = $need->invoices()->save($initInvoice);
        //         //Email receipt
        //         $transacts = 'Donation on need#'. $need->id;
        //         $organization = $need->organization;
        //         if($organization && $transacts){
        //             dispatch(fn() =>  Mail::to(auth()->user())->send(new TransactionReceipt($organization, [  $transacts => $request->amount ?? 0 ])) );
        //         }

        //         return $invoice;
        //     });
    
        //     return response()->json([
        //             'message' => 'Successfully donated.',
        //             'data' => $result
        //         ], 202);
                
        // } catch(\Stripe\Exception\CardException $e) {
        //     return response()->json([
        //         'message' => $e->getError()->message,
        //         'status' => $e->getHttpStatus(),
        //         'type' => $e->getError()->type,
        //         'code' => $e->getError()->code,
        //         'param' => $e->getError()->param,
        //     ], 403);
        // } catch (\Stripe\Exception\RateLimitException $e) {
        //     return response()->json([
        //         'message' => 'Too many requests made, too quickly.',
        //     ], 429);
        // } catch (\Stripe\Exception\InvalidRequestException $e) {
        //     return response()->json([
        //         'message' => "Invalid parameters were supplied.",
        //     ], 402);
        // } catch (\Stripe\Exception\AuthenticationException $e) {
        //     return response()->json([
        //         'message' => "Authentication Failed",
        //     ], 401);
        // } catch (\Stripe\Exception\ApiConnectionException $e) {
        //     return response()->json([
        //         'message' => "Something went wrong, Please try again.",
        //     ], 504);
        // } catch (\Stripe\Exception\ApiErrorException $e) {
        //     return response()->json([
        //         'message' => "Something went wrong, Please try again.",
        //     ], 500);
        // } catch (Exception $e) {
        //     return response()->json([
        //         'message' => "Server error, Please try again.",
        //     ], 503);
        // }
    }
}
