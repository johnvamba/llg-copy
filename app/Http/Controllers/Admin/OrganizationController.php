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

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\Async\OrganizationResource as AsyncResource;

use App\Http\Resources\Mini\UserResource;
use App\Http\Resources\Mini\NeedResource;

use App\Jobs\Mail\OrgCreated;
use App\Jobs\Mail\OrgStatus;
use App\Jobs\Mail\OrgInvite;

use App\OrgInvites;

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
            ->withCount(['needs as active_needs' => function($query){
                $query->whereNotNull('approved_at')->whereRaw('needs.goal > needs.raised');
            }, 'needs as past_needs' => function($query){
                $query->whereNotNull('approved_at')->whereRaw('needs.goal <= needs.raised');
            }, 'members as members_count' => function($query){
                $query->where('organization_members.status', 'approved');
            }])->when($camp_id = session('camp_id'), function($query) use ($camp_id){
                $query->withCount(['campus as accessable' => fn($q) => $q->where('campuses.id', $camp_id)])
                    ->orderBy('accessable', 'desc');
            })
            ->latest();

        if($search = $request->get('search')){
            $mainQuery->where('name', 'like', '%'.$search.'%')
                ->orWhere('email', 'like', '%'.$search.'%');
        }

        if($request->get('requests') == 'true')
            $mainQuery->pending();
        else $mainQuery->approved();

        OrganizationResource::setConversion('listing');

        return OrganizationResource::collection($mainQuery->paginate(16));
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
        if($campus = $request->get('campus')){
            $orgs->whereHas('campus', fn($camp) => $camp->where('campuses.id', $campus['id'] ?? $campus));
        }

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
            // 'benevity_link' => 'required',
            // 'address' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $org = Organization::create( 
                $request->only('name', 'email', 'phone_number', 'site', 'description', 'location', 'lat', 'lng' , 'acnc', 'fundraiser', 'insured', 'taxable', 'address', 'benevity_link') 
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

            if($campus = $request->get('campus')) {
                $campus = array_map(fn($a) => $a['id'] ?? $a['value'], $campus);
                //Sync doesnt work on hasManyThrough
                // $organization->campuses()->sync($campus);

                foreach ($campus as $key => $value) {
                    CampusOrganisation::firstOrCreate(['organization_id' => $org->id, 'campus_id' => $value]);
                }
            }
            // if($campus = $request->get('campus')){
            //     $camp_id = $campus['id'] ?? $campus['value'] ?? null;
            // } else if(auth()->user()->hasRole('campus admin')) {
            //     $camp_id = session('camp_id');
            // }

            // if(isset($camp_id)){
            //     CampusOrganisation::firstOrCreate(['organization_id' => $org->id, 'campus_id' => $camp_id]);
            // }

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
        // DB::enableQueryLog();
        $organization->loadMissing('categories');
        // $camp_id = session('camp_id');
        if($camp_id = session('camp_id'))
            $organization->accessable = $organization->campus()->where('campuses.id', $camp_id)->exists();
        // dd($organization->accessable, $organization->campus()->where('campus_organisations.campus_id', $camp_id)->first(), DB::getQueryLog());

        if(auth()->user()->hasRole('admin'))
            $organization->loadMissing(['campus', 'campuses']);

        OrganizationResource::setConversion('view');
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
            // 'benevity_link' => 'required',
            // 'address' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $organization->fill( 
                $request->only('name', 'email','phone_number', 'site', 'description', 'location', 'lat', 'lng', 'address', 'acnc', 'fundraiser', 'insured', 'taxable', 'benevity_link') 
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
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;
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
            skipPhoto:

            if($campus = $request->get('campus')) {
                $campus = array_map(fn($a) => $a['id'] ?? $a['value'], $campus);
                CampusOrganisation::where('organization_id', $organization->id)->delete();
                //Sync doesnt work on hasManyThrough
                // $organization->campuses()->sync($campus);

                foreach ($campus as $key => $value) {
                    CampusOrganisation::firstOrCreate(['organization_id' => $organization->id, 'campus_id' => $value]);
                }
            }
            // if($campus = $request->get('campus')){
            //     $camp_id = $campus['id'] ?? $campus['value'] ?? null;
            // } else if(auth()->user()->hasRole('campus admin')) {
            //     $camp_id = session('camp_id');
            // }

            // if(isset($camp_id)){
            //     CampusOrganisation::where('organization_id', $organization->id)->delete(); //remove all related
            //     CampusOrganisation::firstOrCreate(['organization_id' => $organization->id, 'campus_id' => $camp_id]);
            // }

            if ($banner = $request->get('banner')) {
                if(strpos($banner, 'http') !== false)
                    goto skipBanner;
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
            skipBanner:

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
        $users = User::unfilter()->whereHas('organizationMembers', function($query) use ($organization){
            $query->where('organization_id', $organization->id);
        })->with('profile')->get();

        $invites = OrgInvites::where('org_id', $organization->id)
            ->with('user.profile')
            ->get()
            ->map(function($invite){
                if(isset($invite->user))
                    return $invite->user;
                $invite->mobile_number = $invite->phone;
                
                $invite->invite_status = 'pending';
                return $invite;
            });

        // dd($users->merge($invites));

        return UserResource::collection((clone $users)->merge($invites))
            ->additional([
                'users_count' => $users->count()
            ]);
    }

    public function memberInvite(Request $request, Organization $organization)
    {
        $request->validate(['users' => 'required']);

        DB::beginTransaction();
        try {
            foreach ($request->get('users') as $key => $user) {
                $insUser = User::where('email', $user['email'] ?? '')->first();

                if(!$insUser) {
                    $insUser = $user['email'] ?? ''; // if user is missing then override to sendable mail.
                }

                $invite = OrgInvites::firstOrCreate([
                    'org_id' => $organization->id,
                    'email' => $user['email'],
                ]);

                $invite->update([
                    'first_name' => optional($insUser)->first_name ?? $user['firstname'] ?? 'Invited',
                    'last_name' => optional($insUser)->last_name ?? $user['lastname'] ?? 'User',
                    'phone' => optional($insUser)->mobile_number ?? $user['phone'] ?? '00 0000 0000'
                ]);

            }

            DB::commit();
            return response()->json(['Email Invitations Sent'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function resendInvite(Request $request, Organization $organization) 
    {
        if($invite = OrgInvites::find( $request->get('invite_id') ))
        {
            dispatch(new OrgInvite($invite->email, $organization, $invite));

            return response()->json(['Email Invitations Resent'], 200);
        }

        return response()->json(['error' => "Invite missing for person"], 400);
    }

    public function removeUser(Request $request, Organization $organization) 
    {
        if($invite = OrgInvites::find( $request->get('invite_id') )) {
            if($invite->delete()) 
                return response()->json(['Invite Removed'], 200);
            
            return response()->json(['Invite Missing'], 400);
        } else if($member = OrganizationMember::where('organization_id', $organization->id)
                ->where("model_id", $request->get('member_id') )
                ->first() ) {

            if($member->delete()) 
                return response()->json(['Member Removed'], 200);

            return response()->json(['Member Missing'], 200);
        }
        return response()->json(['No user removed'], 400);
    }

    public function needs(Request $request, Organization $organization)
    {
        $needs = Need::where('organization_id', $organization->id)
            ->unfilter()
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
            // 'benevity_link' => 'required',
            'description' => 'required',
            'terms' => 'required',
            'location' => 'required'
        ]);

        DB::beginTransaction();

        try {
            $org = Organization::create( 
                    $request->only('name', 'email', 'phone_number', 'site', 'description',  'acnc', 'fundraiser', 'insured', 'taxable', 'benevity_link','location', 'lat', 'lng') 
                    + [
                        'short_description' => substr($request->get('description'), 0, 100),
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

            $users = $request->get('users') ?? [];

            // $queryUsers = User::whereIn('email', array_map(fn($item) => $item['email'] ?? '', $users))->get();
            // $queryUsers
            foreach ($users as $key => $user) {
                $insUser = User::where('email', $user['email'] ?? '')->first();

                if(!$insUser) {
                    $insUser = $user['email'] ?? ''; // if user is missing then override to sendable mail.
                }

                $invite = OrgInvites::firstOrCreate([
                    'org_id' => $org->id,
                    'email' => $user['email'],
                ]);
                
                $invite->update([
                    'first_name' => optional($insUser)->first_name ?? $user['firstName'] ?? 'Invited',
                    'last_name' => optional($insUser)->last_name ?? $user['lastName'] ?? 'User',
                    'phone' => optional($insUser)->mobile_number ?? $user['phone'] ?? '00 0000 0000'
                ]);

                // dispatch(new JobOrgInvite($insUser, $org, $invite)); //Run this on production but with dispatch //dont send this
            }
            
            dispatch(new OrgCreated($org));

            DB::commit();
            return response()->json(['message'=>"Success", 'count' => count($users)], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json('Error occured: '+$e->getMessage(), 400);
        }
    }

    public function access(Request $request, Organization $organization) {
        $request->validate([
            'access' => 'required|boolean'
        ]);

        $camp_id = session('camp_id');

        $node = CampusOrganisation::firstOrNew([
            'campus_id' => $camp_id,
            'organization_id' => $organization->id
        ]);

        if($access = $request->get('access')){
            $node->save();
        } else {
            $node->delete();
        }

        return response()
            ->json(['message'=> optional($node)->wasRecentlyCreated ? 'Campus Attached' : 'Access for campus removed'], 200);
    }

    public function credentials(Request $request){
        if($id = session('org_id')){
            $credential = OrganizationCredential::firstOrNew([
                'organization_id' => $id
            ]);
            return response()->json($credential);
        }

        return response()->json('No registered organization', 400);
    }

    public function postCred(Request $request){
        $request->validate([
            'secret_key' => 'required',
            'publishable_key' => 'required'
        ]);

        if($id = session('org_id')){
            $credential = OrganizationCredential::firstOrNew([
                'organization_id' => $id
            ]);

            $credential->fill( $request->only([
                'secret_key',
                'publishable_key'
            ]) );

            $credential->save();

            return response()->json($credential);
        }

        return response()->json('No registered organization', 400);
    }

     public function approve(Organization $organization){
        DB::beginTransaction();
        try {
            //Do validation here
            $organization->fill([
                'approved_by' => auth()->user()->id,
                'approved_at' => now()
            ]);
            $organization->save();
            dispatch(new OrgStatus($organization, true));

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    public function reject(Organization $organization){
    DB::beginTransaction();
        try {
            // dispatch(new OrgStatus($organization, false));
            $organization->delete();
            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }
}
