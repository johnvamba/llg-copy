<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\GroupResource;
use App\Http\Resources\Async\GeneralResource;
use App\Http\Resources\Mini\UserResource;
use Illuminate\Support\Facades\Mail;

use App\Group;
use App\Goal;
use App\GroupLocation;
use App\GroupParticipant;
use App\ScopedUser as User;
use App\Mail\GroupInvitation;
use App\Helper\Scopes\UserPortalScope;

use DB;
use Str;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $group = Group::with('user')->withCount('participants')->withGoalRatio()->latest();
        
        if($search = $request->get('search'))
            $group->where('name', 'like', '%'.$search.'%');

        GroupResource::setConversion('listing');

        return GroupResource::collection($group->paginate());
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

    public function inviteUser()
    {

    }

    public function async(Request $request) 
    {
        $group = Group::latest();
        
        if($search = $request->get('search'))
            $group->where('name', 'like', '%'.$search.'%');

        // GroupResource::setConversion('listing');

        return GeneralResource::collection($group->paginate());
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
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'privacy' => 'required',
            'campus' => 'required',
            // 'address' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'goal' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $group = Group::create( 
                $request->only('name', 'description', 'location', 'privacy', 'lat', 'lng' , 'address') 
                + [
                    'user_id' => (auth()->user())->id,
                    'short_description' => substr($request->description, 0, 100)
                ]
            );

            $goal = Goal::firstOrCreate([
                'model_type' => Group::class,
                'model_id' => $group->id
            ], [
                'term' => $request->get('term'),
                'need' => $request->get('goal')
            ]);

            $campus = $request->get('campus') ?? [];
            GroupLocation::firstOrCreate([
                'group_id' => $group->id,
                'location_type' => 'App\Campus',
                'location_id' => $campus['id'] ?? session('camp_id')
            ]);

            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $group 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $group->getMedia('photo');
            }

            if($users = $request->get('users')) {
                foreach ($users as $key => $value) {
                    //Reject if participating other group
                    if(GroupParticipant::hasUser( $value['id'] ?? null )->exists() && array_key_exists('id', $value))
                        continue;

                    //Remove pending
                    GroupParticipant::hasUser($value['id'] ?? null, 'pending')
                        ->where('group_id', '!=', $group->id)
                        ->delete();

                    GroupParticipant::firstOrCreate([
                        'group_id' => $group->id,
                        'user_id' => $value
                    ]);
                }
            }

            DB::commit();
            return new GroupResource($group);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  Group $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        //load other parts here
        $group->loadMissing(['campus', 'user']);

        GroupResource::setConversion('listing');

        return new GroupResource($group);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Group $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Group $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'privacy' => 'required',
            'campus' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'goal' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $group->fill( 
                $request->only('name','description','location','privacy','lat','lng') 
                + [
                    'user_id' => (auth()->user())->id,
                    'short_description' => substr($request->description, 0, 100)
                ]
            );

            if($campus = $request->get('campus')) {
                $group->groupLocation()->delete(); //remove extra

                GroupLocation::firstOrCreate([
                    'group_id' => $group->id,
                    'location_type' => 'App\Campus',
                    'location_id' => $campus['id'] ?? session('camp_id')
                ]);
            }
            $goal = Goal::firstOrCreate([
                'model_type' => Group::class,
                'model_id' => $group->id
            ]);

            $goal->update([
                'term' => $request->get('term'),
                'need' => $request->get('goal')
            ]);

            //We can do better pd diri.
            if ($image = $request->get('photo')) {
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $group 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $group->getMedia('photo');
            }
            skipPhoto:

            $group->save();
            DB::commit();
            return new GroupResource($group);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Group $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        DB::beginTransaction();
        try {
            $group->delete();
            DB::commit();
            return response()->json('Removed', 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function searchUserInvite(Request $request)
    {
        DB::enableQueryLog();
        $users = User::unfilter()->with('profile')->latest();

        if($request->get('suggest') === true)
            $users->inRandomOrder();
        else if($search = $request->get('search')) {
            $users
            //Version 1
            //->where('name', 'like', "%".$search."%");
            // ->whereHas('profile', fn($profile) => $profile->where('first_name','like', "%".$search."%")->orWhere('last_name', 'like', "%".$search."%"));
            ->whereHas('profile', fn($profile) => $profile
                ->whereRaw("CONCAT_WS(' ', first_name, last_name) LIKE ?", ['%'.$search.'%']) );
        }

        if($grp_id = $request->get('group_id'))
        {
            $users
            ->withCount(['group_pivots as invite_status' => function($status) use ($grp_id){
                $status->select('status')->where('group_id', $grp_id);//->selectRaw("(case status is not null then status else 'uninvited')");
            }]);
        }

        return UserResource::collection($users->paginate(5));
    }

    public function initUserInvite(Request $request)
    {
        $user = User::unfilter()->find($request->get('user_id'));
        $group = Group::unfilter()->find($request->get('group_id'));

        $gp = null;
        if($user && $group) {
            $gp = GroupParticipant::hasUser($request->get('user_id'))->first(); 

            if(!is_null(optional($gp)->group_id) && optional($gp)->group_id !== $group->id){
                return reponse()->json('Participating user on other group already', 400);
            }

            if(!$gp)
                $gp = GroupParticipant::firstOrCreate( $request->only('group_id', 'user_id') );
            
            Mail::to($user)->send(new GroupInvitation($group)); //Run this on production but with dispatch
        }

        if(is_null($gp))
            return response()->json('Error in inviting User', 400);

        return response()->json([ 'invite_status' => ($gp->status ?? 'pending') ], 200);
    }

    public function members(Request $request, Group $group) {
        $members = $group->participant_users()
        ->unfilter()
        ->with('profile');
        
        return UserResource::collection( $members->paginate() );
    }
}
