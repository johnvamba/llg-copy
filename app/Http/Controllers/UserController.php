<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\UserProfile;
use DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(User::with('profile')->paginate());
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
    public function show(User $user)
    {
        //
        $profile = UserProfile::where('user_id', $user->id)->first();
        $user['profile'] = $profile;

        return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        DB::transaction(function () use ($request, $user) {
            User::find(auth()->user()->id)
                ->update(request()->only(
                        'name',
                        'email'
                    ));

            UserProfile::where('user_id', auth()->user()->id)
                ->update(request()->only(
                    'age',
                    'location',
                    'lat',
                    'lng',
                    'bio'
                ));

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
        });

        return response()->json([
                'message' => 'Sucessfully updated',
            ], 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            
            return response()->json([
                    'message' => 'User successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
