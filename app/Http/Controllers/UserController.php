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
                'success' => true,
                'message' => 'Sucessfully updated',
            ], 202);
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
