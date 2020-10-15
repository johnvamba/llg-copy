<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\User;
use App\Organization;
use App\OrganizationMember;

class OrganizationMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Organization $organization)
    {
        $members = OrganizationMember::where('organization_id', $organization->id)
            ->get();

        foreach ($members as $member) {
            $member->model;
        }

        return response()->json($members);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUninvitedUsers(Request $request)
    {
        $users = User::with('profile')
            ->whereDoesntHave('organizationMembers', function($query) use ($request) {
                $query->where([
                        ['organization_id', $request->organization_id]
                    ]);
            })
            ->role('organization admin');

            if ($request->name) {
                $users->where('name', 'like', '%'.$request->name.'%');
            }

        $results = $users->get();

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::find($request->user);

        $member = OrganizationMember::make(request()->only([
                'organization_id'
            ]));

        $addedMember = $user->organizationMembers()->save($member);

        return response()->json($addedMember, 202);
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
    public function update(Request $request, OrganizationMember $organizationMember)
    {
        $organizationMember->update(request()->only(['status']));

        return response()->json($organizationMember, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrganizationMember $organizationMember)
    {
        try {
            $organizationMember->delete();
            
            return response()->json([
                    'message' => 'Member successfully remove.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
