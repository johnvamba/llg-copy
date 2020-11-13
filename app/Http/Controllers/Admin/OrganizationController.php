<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Organization;
use App\OrganizationCredential;
use App\OrganizationHasCategory;

use App\User;
use App\Need;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\Async\OrganizationResource as AsyncResource;

use App\Http\Resources\Mini\UserResource;
use App\Http\Resources\Mini\NeedResource;

use DB;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $mainQuery = Organization::latest(); // Add campus filter here

        $orgs = (clone $mainQuery)->withCount(['needs as active_needs' => function($query){
            $query->whereNotNull('approved_at')->whereRaw('needs.goal > needs.raised');
        }, 'needs as past_needs' => function($query){
            $query->whereNotNull('approved_at')->whereRaw('needs.goal <= needs.raised');
        }, 'members as members_count' => function($query){
            $query->where('organization_members.status', 'approved');
        }]);

        return OrganizationResource::collection($orgs->paginate())
            ->additional([
                'org_count' => $mainQuery->count()
            ]);
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
        DB::beginTransaction();

        try {
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['errors'=>$e->getMessage], 400);
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        //
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

    public function memberInvite(Request $request)
    {
        
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
}
