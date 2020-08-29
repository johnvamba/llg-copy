<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterStoreRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\UserProfile;
use DB;

class AuthController extends Controller
{

    /**  
     * Register a user
     * @return json
    */
    public function register(RegisterStoreRequest $request)
    {        
        $result = DB::transaction(function () use ($request) {
                $user = User::register($request);
                $userProfile = UserProfile::createProfile($request, $user->id);
                $user->assignRole('user');

                if ($request->hasFile('photo')) {
                    $path = Storage::disk(env('FILESYSTEM_DRIVER'))
                        ->putFile(
                            'img', 
                            $request->file('photo')
                        );

                    $url = Storage::disk(env('FILESYSTEM_DRIVER'))
                        ->url($path);

                    UserProfile::uploadPhoto($url, $user->id);
                }

                $token = $user->createToken('api')->accessToken;

                $user['profile'] = $userProfile;

                $credential = array_merge(
                        $user->toArray(),
                        ['token' => $token]
                    );

                return $credential;
            });

        return response()->json([
                'message' => "Successfully registered.",
                'data' => $result
            ], 202);
    }
}
