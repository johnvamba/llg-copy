<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterStoreRequest;
use App\User;
use App\UserProfile;
use DB;

class AuthController extends Controller
{

    /**  
     * Register a user
    */
    public function register(RegisterStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $user = User::register($request);
                $profile = UserProfile::createProfile($request, $user->id);

                $token = $user->createToken('api')->accessToken;
                
                $user['profile'] = $profile;

                $credential = array_merge(
                        $user->toArray(),
                        ['token' => $token]
                    );

                return $credential;
            });

        return response()->json([
                'success' => true,
                'message' => "Successfully registered.",
                'data' => $result
            ], 202);
    }
}
