<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionReceipt;
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
        \Stripe\Stripe::setApiKey(env('MIX_STRIPE_SECRET_KEY'));
        
        if ($request->gateway == 'apple pay') {
            $credential = CustomerCredential::where(function($query) use ($request) {
                    $query->where('last_four_number', $request->last4)
                        ->where('card_brand', $request->brand)
                        ->where('is_apple_pay_card', $request->isApplePayCard);
                })->first();

            if (!$credential) {
                try {
                    $customer = \Stripe\Customer::create([
                        'name' => auth()->user()->name,
                        'source' => $request->tokenId
                    ]);

                    $credential = CustomerCredential::create([
                        'customer_id' => $customer->id,
                        'user_id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'card_brand' => $request->brand,
                        'last_four_number' => $request->last4,
                        'expiry_month' => $request->expMonth,
                        'expiry_year' => $request->expYear,
                        'is_apple_pay_card' => $request->isApplePayCard
                    ]);
                    
                    $request->merge(['customer_id' => $customer->id]);
                } catch (\Exception $e) {
                    \Log::info("Cannot create Stripe customer");
                }
            } else {
                $request->merge(['customer_id' => $credential->customer_id]);
            }
        }

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
                    'customer' => $request->customer_id,
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
                $transacts = 'Donation on need#'. $need->id;
                $organization = $need->organization;
                if($organization && $transacts){
                    dispatch(fn() =>  Mail::to(auth()->user())->send(new TransactionReceipt($organization, [  $transacts => $request->amount ?? 0 ])) );
                }

                return $invoice;
            });

            DB::commit();

            return response()->json([
                    'message' => 'Successfully donated.',
                    'data' => $result
                ], 202);
                
        } catch (\Stripe\Exception\RateLimitException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Too many requests made, too quickly.',
            ], 429);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Invalid parameters were supplied.",
            ], 402);
        } catch (\Stripe\Exception\AuthenticationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Authentication Failed",
            ], 401);
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Something went wrong, Please try again.",
            ], 504);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Something went wrong, Please try again.",
            ], 500);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => "Server error, Please try again.",
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
