<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\UserProfile;
use Carbon\Carbon;
use DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('profile');

        if ($request->role) {
            $users->role($request->role);
        }
        
        $results = $users->get();

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsersStatistics(Request $request)
    {
        $date = Carbon::now();

        $users['Total Users'] = User::withTrashed()->get()->count();
        $users['Active Users'] = User::all()->count();     
        $users['New Users'] = User::where([
                ['created_at', '>=', $date->startOfYear()->toDateString()], 
                ['created_at', '<=', $date->endOfYear()->toDateString()]
            ])
            ->get()
            ->count();
            
        return response()->json($users);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers(Request $request)
    {
        //
        $results['columns'] = ['id', 'name', 'email'];

        $users = User::orderBy('created_at', 'desc')
                    ->get()
                    ->chunk($request->limit);

        $results['data'] = $users;
        $results['module'] = [
                'path' => '/users',
                'singular' => 'user',
                'plural' => 'users',
                'endpoint' => 'users' 
            ];

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
            $user = User::create(
                array_merge(
                    request()->only([
                        'name',
                        'email'
                    ]),
                    ['password' => bcrypt($request->password)]
                )
            );

            $role = Role::find($request->role);
            $user->assignRole($role->name);

            $user['profile'] = UserProfile::createProfile($request, $user->id);

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

            return $user;
        });

        return response()->json($result, 202);
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
        $result = DB::transaction(function () use ($request, $user) {
            User::find($user->id)
                ->update(request()->only(
                        'name',
                    ));

            UserProfile::where('user_id', $user->id)
                ->update(request()->only(
                    'age',
                    'location',
                    'lat',
                    'lng',
                    'bio',
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

            return User::with('profile')->find($user->id);
        });

        return response()->json([
                'message' => 'Sucessfully updated',
                'data' => $result
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
