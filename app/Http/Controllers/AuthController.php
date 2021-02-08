<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Requests\RegisterInfoStoreRequest;
use App\Http\Requests\LocationStoreRequest;
use App\Http\Requests\UploadPhotoStoreRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterStoreRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\UserProfile;
use DB;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class AuthController extends Controller
{
    use SendsPasswordResetEmails;
    
    /*
        SendsPasswordResetEmails::sendResetLinkEmail();
        ResetsPasswords::reset();
    */

    /**
     * User's login
     * 
     */
    public function login(LoginRequest $request)
    {
        if (Auth::attempt([
            'email' => $request->email, 
            'password' => $request->password
        ])) {
            $user = User::with('roles')->where('email', $request->email)->first();

            return response()->json([
                'message' => 'Successfully authenticated.',
                'token' => $user->createToken('api')->accessToken,
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'Invalid email or password'
        ], 401);
    }


    /**  
     * Register a user
     * 
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

    /**
     * Register user info
     * 
     * @return json
     */
    public function registerInfo(RegisterInfoStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $user = User::create([
                        'name' => $request->firstName.' '.$request->lastName,
                        'email' => $request->email,
                    ]);
                $user->assignRole('user');

                $profile = UserProfile::create([
                        'first_name' => $request->firstName,
                        'last_name' => $request->lastName,
                        'user_id' => $user->id,
                        'age' => $request->age,
                        'bio' => $request->bio
                    ]);

                $user['profile'] = $profile;

                return $user;
            });

        return response()->json($result, 202);
    }

    /**
     * Register user's location
     * 
     * @return json
     */
    public function registerLocation(LocationStoreRequest $request)
    {
        $profile = UserProfile::find($request->id);
        $profile->update($request->validated());

        return response()->json($profile, 202);
    }
    
    /**
     * Upload user's photo
     * 
     * @return json
     */
    public function registerUploadPhoto(UploadPhotoStoreRequest $request)
    {
        $profile = UserProfile::find($request->id);

        if ($request->get('photo')) {
            $photo = $request->get('photo');
            $name = time().'-'.Str::random(20);
            $extension = explode('/', explode(':', substr($photo, 0, strpos($photo, ';')))[1])[1];

            if (preg_match('/^data:image\/(\w+);base64,/', $photo)) {
                $data = substr($photo, strpos($photo, ',') + 1);
                $data = base64_decode($data);

                Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->put($name.'.'.$extension, $data);

                Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->url($data);

                $url = Storage::url($name.'.'.$extension);

                $profile = UserProfile::uploadPhoto($url, $profile->user_id);
            }
        }

        return response()->json($profile, 202);
    }

    /**
     * Auth user
     * 
     * @return json
     */
    public function authUser(Request $request, User $user)
    {
        $user['profile'] = UserProfile::where('user_id', $user->id)->first();
        $token = $user->createToken('api')->accessToken;
        $user->getRoleNames();

        $data = [
            'data' => $user,
            'token' => $token
        ];

        return response()->json($data, 202);
    }
    //override reset link sending response
    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response()->json('Password reset link sent!', 200);
    }

    public function logout(Request $request) {
        
    }
}
