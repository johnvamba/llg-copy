<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Group;
use App\GroupInvite;
use App\GroupParticipant;
use App\Notification;
use App\Events\GroupInvite as GroupInviteEvent;

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
     * Get users that can be invited
     *
     * @param json
     * @return \Illuminate\Http\Response
     */
    public function getUsersToInvite(Request $request, Group $group)
    {
        $page = $request->page ?: 1;

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
            ->whereNotIn('id', $groupUsers);

        if ($request->search) {
            $users = $users->where('name', 'LIKE', '%'.strtolower($request->search).'%');
        }

        $results = $users->latest()
            ->paginate(10, ['*'], 'user-to-invite', $page);

        return response()->json($results, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $group = Group::find($request->group_id);

        $invite = GroupInvite::create(request()->only([
            'group_id',
            'user_id'
        ]));

        $params = [
            "to" => $request->user_id,
            "description" => "invited you to join {$group->name} here",
            "type" => 'group_invitation',
            "isRead" => false
        ];

        Notification::storeNotification($invite, $params);

        event(new GroupInviteEvent($params));

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
