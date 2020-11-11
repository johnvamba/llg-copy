<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Group;
use App\GroupInvite;
use App\GroupParticipant;

class GroupInviteController extends Controller
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
     * Get users not in group
     *
     * @param json
     * @return \Illuminate\Http\Response
     */
    public function getUsersNotInGroup(Request $request, Group $group)
    {
        $participants = GroupParticipant::where('group_id', $group->id)
            ->where(function($query) use($group) {
                $query->where('status', 'approved');
                $query->orWhere('status', 'pending');
            })->pluck('user_id');
        
        $invited = GroupInvite::where('group_id', $group->id)
            ->where(function($query) use($group) {
                $query->where('status', 'approved');
                $query->orWhere('status', 'pending');
            })->pluck('user_id');

        $groupUsers = $participants->merge($invited);
        $groupUsers[] = $group->user_id;

        $users = User::with('profile')
            ->role('user')
            ->whereNotIn('id', $groupUsers)->get();

        return response()->json($users, 202);
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
        $invite = GroupInvite::create(request()->only([
            'group_id',
            'user_id'
        ]));

        return response()->json($invite, 202);
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
    public function update(Request $request, $id)
    {
        //
        $invite = GroupInvite::find($id);
        $invite->update(request()->only(['status']));

        if ($request->status == 'approved') {
            GroupParticipant::create([
                'group_id' => $invite->group_id,
                'user_id' => $invite->user_id,
                'status' => $request->status
            ]);
        }

        return response()->json($invite, 202);
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
