<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Aws\Exception\AwsException;
use App\User;
use App\Otp;
use Carbon\Carbon;
use AWS; 
use DB;
use Hash;

class OTPController extends Controller
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
     * Verification of user
     * Generate 6 digit code , store in otp
     * Sending sms code to user
     */
    public function sendOTP(Request $request)
    {
        $sns = AWS::createClient('sns');
    
        $user = User::where('mobile_number', $request->mobileNumber)->first();

        if (!$user) {
            return response()->json([
                'mobile_number' => 'The mobile number is not exist.'
            ], 422);
        }

        $OTP = Otp::where(function($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('status', 'pending');
            })->first();

        DB::beginTransaction();

        $code = mt_rand(100000, 999999);

        !$OTP ? Otp::create([
                'user_id' => $user->id,
                'mobile_number' => $request->mobileNumber,
                'otp' => bcrypt($code),
                'status' => 'pending',
                'expiry' => Carbon::now()->addMinutes(15)
            ]) : $OTP->update([
                    'otp' => bcrypt($code), 
                    'expiry' => Carbon::now()->addMinutes(15)
                ]);

        try {
            $sns->publish([
                'Message' => "$code is your one time password (OTP) for phone verification.",
                'PhoneNumber' => "+{$request->mobileNumber}"
            ]);
            DB::commit();
        } catch(AwsException $e) {
            DB::rollBack();

            return response()->json([
                "message" => "Failed to send otp. Please try again."
            ], 500);
        }

        return response()->json([
            "message" => "Verification code successfully sent."
        ], 200);
    }

    /**
     * OTP verification
     */
    public function verifyOTP(Request $request)
    {
        $date = Carbon::now();

        $otp = Otp::where('mobile_number', $request->mobileNumber)->first();

        if (Hash::check($request->otp, $otp->otp)) {
            if ($date->lessThanOrEqualTo($otp->expiry)) {
                $user = User::with('profile')->find($otp->user_id);

                $token = $user->createToken('api')->accessToken;
                $user->getRoleNames();

                $data = [
                    'data' => $user,
                    'token' => $token
                ];

                return response()->json($data, 202);
            }

            return response()->json([
                'message' => 'Your verification code is expired.'
            ], 422);
        }

        return response()->json([
            'message' => 'Your verification code is invalid.'
        ], 405);
    }

    /**
     * Resend OTP
     */
    public function resendOTP(Request $request)
    {
        $sns = AWS::createClient('sns');
    
        $user = User::where('mobile_number', $request->mobileNumber)->first();

        if (!$user) {
            return response()->json([
                'mobile_number' => 'The mobile number is not exist.'
            ], 422);
        }

        $OTP = Otp::where(function($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('status', 'pending');
            })->first();

        DB::beginTransaction();

        $code = mt_rand(100000, 999999);

        $OTP->update([
                'otp' => bcrypt($code), 
                'expiry' => Carbon::now()->addMinutes(15)
            ]);

        try {
            $sns->publish([
                'Message' => "$code is your one time password (OTP) for phone verification.",
                'PhoneNumber' => "+{$request->mobileNumber}"
            ]);
            DB::commit();
        } catch(AwsException $e) {
            DB::rollBack();

            return response()->json([
                "message" => "Failed to send otp. Please try again."
            ], 500);
        }

        return response()->json([
            "message" => "Verification code successfully sent."
        ], 200);
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
}
