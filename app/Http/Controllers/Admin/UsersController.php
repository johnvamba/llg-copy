<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\UserProfile;
use App\CampusUser;
use Illuminate\Support\Facades\Storage;

use App\Http\Resources\GroupResource;
use App\Http\Resources\UserResource;

use App\Need;
use App\Http\Resources\NeedResource;

use Spatie\Permission\Models\Role;
use DB;
use Str;

use App\Otp;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        DB::enableQueryLog();
        $users = User::latest()->with('profile');

        if($search = $request->get('search')) {
            $users->where('email', 'like', '%'.$search.'%')
                ->orWhere('name', 'like', '%'.$search.'%');
        }

        if($request->get('debug')){
            dd($users->get(), auth()->user()->hasRole('campus admin'), DB::getQueryLog(),session()->only(['filterOn','camp_id','org_id']));
        }

        return UserResource::collection($users->paginate($request->get('per_page')))
            ->additional([
                'users_count' => User::count()
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $request->validate([
            'email' => 'required|email|unique:users',
            'firstName' => 'required',
            'lastName' => 'required',
            'age' => 'required',
            'bio' => 'required',
            // 'photo' => 'sometimes|required|image',
            'type' => 'required',
            'mobile_number' => 'required'
        ]);

        DB::beginTransaction();
        try {

            $user = User::create([
                'email' => $request->get('email'),
                'password' => bcrypt('temp_secret'),
                'name'  => $request->get('firstName'). ' ' .$request->get('lastName'),
                'mobile_number' => $request->get('mobile_number')
            ]);

            if($type = $request->get('type')){
                $role = Role::firstOrCreate(['name'=> $type['value'] ?? 'user']);
                $user->syncRoles( $role->name );
            }

            if($organization = $request->get('organization')){
                $user->organizationMembers()->create([
                    'organization_id' => $organization['id'] ?? $organization['value'] ?? 0,
                    'status' => 'approved'
                ]);
            }

            if($campus = $request->get('campus')){
                $user->campuses()->sync([$campus['id'] ?? $campus['value'] ?? $campus]);
            }

            $profile =$user->profile()->create(
                $request->only('age','bio')
                + [
                    'first_name' => $request->firstName,
                    'last_name' => $request->lastName,
                    'location' => $request->location ?? 'Melbourne, Australia',
                    'lat' => $request->lat ?? -37.8136, 
                    'lng' => $request->lng ?? 144.9631
                ]
            );

            if ($photo = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($photo))[1];

                if (preg_match('/^data:image\/(\w+);base64,/', $photo)) {
                    $data = substr($photo, strpos($photo, ',') + 1);
                    $data = base64_decode($data);
    
                    Storage::disk(env('FILESYSTEM_DRIVER'))
                        ->put($name.'.'.$extension, $data);

                    $profile->avatar = Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->url($name.'.'.$extension);
                }

                $profile->save();
            }

            DB::commit();
            return new UserResource($user);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->loadMissing(['profile', 'roles']);

        if($user->hasRole('campus admin')){
            $user->loadMissing('campus');
        } else if ($user->hasRole('organization admin')){
            $user->loadMissing('organization');
        }

        return new UserResource($user);
    }

    public function showNeedMet(User $user) {
        $needs = Need::unfilter()
            ->whereHas('contributors', fn($q) => $q->unfilter()->where('model_id', $user->id) )
            ->with(['contribution' => fn($q) => $q->where('need_mets.model_id', $user->id)->where('need_mets.model_type', 'App\User')]);

        return NeedResource::collection($needs->paginate(5));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            // 'email' => 'required|email|unique:users',
            'firstName' => 'required',
            'lastName' => 'required',
            'age' => 'required',
            'bio' => 'required',
            // 'photo' => 'sometimes|required|image',
            'type' => 'required',
            'mobile_number' => 'required'
        ]);

        DB::beginTransaction();
        try {
            $user->fill([
                'email' => $request->get('email'),
                'name'  => $request->get('firstName'). ' ' .$request->get('lastName'),
                'mobile_number' => $request->get('mobile_number')
            ]);

            if($type = $request->get('type')){
                $role = Role::where('name', $type['value'] ?? 'user')->first();
                $user->syncRoles( $role->name );
            }

            if($organization = $request->get('organization')){
                //We delete the instances of the user connection to any organization
                $user->organizationMembers()->delete(); 

                $user->organizationMembers()->create([
                    'organization_id' => $organization['id'] ?? $organization['value'] ?? 0,
                    'status' => 'approved'
                ]);
            }

            if($campus = $request->get('campus')){
                $user->campuses()->sync([$campus['id'] ?? $campus['value'] ?? $campus]);
            }

            $user->save();

            $user->profile->fill(
                $request->only('age','bio')
                + [
                    'first_name' => $request->firstName,
                    'last_name' => $request->lastName,
                    'location' => $request->location ?? 'Sydney, Australia',
                    'lat' => $request->lat ?? -33.868782, 
                    'lng' => $request->lng ?? 151.207583
                ]
            );

            if ($photo = $request->get('photo')) {
                if(strpos($photo, 'http') !== false)
                    goto skipPhoto;

                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($photo))[1];

                if (preg_match('/^data:image\/(\w+);base64,/', $photo)) {
                    $data = substr($photo, strpos($photo, ',') + 1);
                    $data = base64_decode($data);
    
                    Storage::disk(env('FILESYSTEM_DRIVER'))
                        ->put($name.'.'.$extension, $data);

                    $user->profile->avatar = Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->url($name.'.'.$extension);
                }
            }
            skipPhoto:
            $user->profile->save();

            Otp::where('user_id', $user->id)->delete();

            DB::commit();
            return new UserResource($user);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            // $user->profile()->delete(); //wala siya deletd at. just delete the user
            if(auth()->user()->id == $user->id)
                return response()->json('Could not delete self', 400);

            Otp::where('user_id', $user->id)->delete();

            $user->delete();

            DB::commit();
            return response()->json('Successfully deleted user');
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function groups(User $user)
    {
        $groups = $user->groups_member()
            ->withCount('participants')
            ->latest();

        return GroupResource::collection( $groups->paginate(5) );
    }
}
