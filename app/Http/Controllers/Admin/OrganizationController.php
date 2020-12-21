<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Organization;
use App\OrganizationCredential;
use App\OrganizationHasCategory;
use App\OrganizationCategory;
use App\OrganizationMember;
use App\CampusOrganisation;

use Illuminate\Support\Facades\Mail;
use App\Mail\OrgInvitation;

use App\User;
use App\UserProfile;
use App\Need;
use App\Mail\OrgInvitation;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\Async\OrganizationResource as AsyncResource;

use App\Http\Resources\Mini\UserResource;
use App\Http\Resources\Mini\NeedResource;

use DB;
use Str;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $mainQuery = Organization::with('media')
            ->latest()
            ->withCount(['needs as active_needs' => function($query){
                $query->whereNotNull('approved_at')->whereRaw('needs.goal > needs.raised');
            }, 'needs as past_needs' => function($query){
                $query->whereNotNull('approved_at')->whereRaw('needs.goal <= needs.raised');
            }, 'members as members_count' => function($query){
                $query->where('organization_members.status', 'approved');
            }]);

        return OrganizationResource::collection($mainQuery->paginate());
    }

    /**
     * Display a listing of the resource for async selec.
     *
     * @return \Illuminate\Http\Response
     */
    public function async(Request $request)
    {
        $orgs = Organization::query();

        if($request->get('sort_latest')){
            $orgs->latest();
        }
        //Add queries here

        if($name = $request->get('name')){
            $orgs->where('name', 'like', '%'.$name.'%');
        }

        return AsyncResource::collection( $orgs->paginate() );
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
            'name' => 'required',
            'email' => 'required|email|unique:organizations',
            'site' => 'required',
            'phone_number' => 'required',
            'description' => 'required',
            'category' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $org = Organization::create( 
                $request->only('name', 'email', 'phone_number', 'site', 'description', 'location', 'lat', 'lng') 
                + [
                    'short_description' => substr($request->get('description'), 0, 100)
                ]);

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = OrganizationCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
                $org->categories()->sync($categories);
            }

            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $org 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $org->getMedia('photo');
            }

            if($campus = $request->get('campus')){
                $camp_id = $campus['id'] ?? $campus['value'] ?? null;
            } else if(auth()->user()->hasRole('campus admin')) {
                $camp_id = session('camp_id');
            }

            if(isset($camp_id)){
                CampusOrganisation::firstOrCreate(['organization_id' => $org->id, 'campus_id' => $camp_id]);
            }

            if ($banner = $request->get('banner')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($banner))[1];
                
                $org 
                    ->addMediaFromBase64($banner)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('banner');

                $org->getMedia('banner');
            }

            if(auth()->user()->hasRole('admin'))
                $org->loadMissing('campus');

            DB::commit();
            return new OrganizationResource($org);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function show(Organization $organization)
    {
        $organization->loadMissing('categories');

        if(auth()->user()->hasRole('admin'))
            $organization->loadMissing('campus');

        return new OrganizationResource($organization);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function edit(Organization $organization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Organization $organization)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'site' => 'required',
            'phone_number' => 'required',
            'description' => 'required',
            'category' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $organization->fill( 
                $request->only('name', 'email','phone_number', 'site', 'description', 'location', 'lat', 'lng') 
                + [
                    'short_description' => substr($request->get('description'), 0, 100)
                ]);

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = OrganizationCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
                $organization->categories()->sync($categories);
            }
            
            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $organization 
                ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $organization->getMedia('photo');
            }

            if($campus = $request->get('campus')){
                $camp_id = $campus['id'] ?? $campus['value'] ?? null;
            } else if(auth()->user()->hasRole('campus admin')) {
                $camp_id = session('camp_id');
            }

            if(isset($camp_id)){
                CampusOrganisation::where('organization_id', $organization->id)->delete(); //remove all related
                CampusOrganisation::firstOrCreate(['organization_id' => $organization->id, 'campus_id' => $camp_id]);
            }

            if ($banner = $request->get('banner')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($banner))[1];
                
                $organization 
                ->clearMediaCollection('banner')
                    ->addMediaFromBase64($banner)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('banner');

                $organization->getMedia('banner');
            }

            if(auth()->user()->hasRole('admin'))
                $organization->loadMissing('campus');

            if($organization->isDirty())
                $organization->save();

            DB::commit();
            return new OrganizationResource($organization);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        DB::beginTransaction();
        try {
            $organization->delete();

            DB::commit();
            return response()->json('Deleted', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function members(Organization $organization)
    {
        $users = User::whereHas('organizationMembers', function($query) use ($organization){
            $query->where('organization_id', $organization->id);
        });

        return UserResource::collection((clone $users)->paginate())
            ->additional([
                'users_count' => $users->count()
            ]);
    }

    public function memberInvite(Request $request, Organization $organization)
    {
        $request->validate(['users' => 'required']);

        DB::beginTransaction();
        try {
            foreach ($request->get('users') as $key => $value) {
                $user = User::firstOrCreate([
                    'email' => $request->get('email'),
                    'password' => bcrypt('temp_secret'),
                    'name'  => $value['firstname']. ' ' .$value['lastname']
                ]);

                $profile = UserProfile::create([
                    'age' => 18,
                    'bio' => '',
                    'location' => $organization->location ?? 'Sydney, Australia',
                    'lat' => $organization->lat,
                    'lng' => $organization->lng,
                    'user_id' => $user->id,
                    'first_name' =>$value['firstname'],
                    'last_name' =>$value['lastname']
                ]);

                $user->syncRoles('user');

                OrganizationMember::firstOrCreate([
                    'model_type' => User::class,
                    'model_id' => $user->id,
                    'organization_id' => $organization->id
                ]);

                if($user) {
                    dispatch(fn() => Mail::to($user)->send(new OrgInvitation($organization))); //Run this on production but with dispatch
                }
            }

            DB::commit();
            return response()->json(['Email Invitations Sent'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function needs(Request $request, Organization $organization)
    {
        $needs = Need::where('organization_id', $organization->id)
            ->when($status = $request->get('status'), function($sub) use ($status){
                $sub
                    ->when($status == 'current', fn($need) => $need->whereRaw('raised < goal')->whereNotNull('approved_at') )
                    ->when($status == 'past', fn($need) => $need->whereRaw('raised >= goal')->whereNotNull('approved_at') );
            });

        return NeedResource::collection($needs->paginate());
    }

    public function openCreate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:organizations',
            'site' => 'required',
            'phone_number' => 'required',
            'description' => 'required',
            'category' => 'required',
        ]);

        DB::beginTransaction();

        try {
            $org = Organization::create( 
                    $request->only('name', 'email', 'phone_number', 'site', 'description') 
                    + [
                        'short_description' => substr($request->get('description'), 0, 100),
                        'location' => 'Sydney, Australia',
                        'lat' => -33.868782, 
                        'lng' => 151.207583
                    ]);

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = OrganizationCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
                $org->categories()->sync($categories);
            }

            $users = $request->get('users') ?? [];

            // $queryUsers = User::whereIn('email', array_map(fn($item) => $item['email'] ?? '', $users))->get();
            // $queryUsers
            foreach ($users as $key => $user) {
                $insUser = User::where('email', $user['email'] ?? '')->first();
                if($insUser) {
                    OrganizationMember::firstOrCreate([
                        'model_type' => User::class,
                        'model_id' => $insUser->id,
                        'organization_id' => $organization->id
                    ]);
                } else {
                    $intUser = $user['email'] ?? '';
                    //send invitation by email
                }

                if($insUser && $org) {
                    dispatch(fn() => Mail::to($insUser)->send(new OrgInvitation($org))); //Run this on production but with dispatch
                }
            }

            DB::commit();
            return response()->json(['message'=>"Success", 'count' => count($users)], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json('Error occured: '+$e->getMessage(), 400);
        }

    }
}
