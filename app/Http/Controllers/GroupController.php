<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupStoreRequest;
use App\Http\Requests\CommunityUpdateRequest;
use App\Http\Requests\GroupMessageStoreRequest;
use App\Http\Controllers\CommunityController;
use Illuminate\Http\Request;
use App\Group;
use App\Community;
use App\GroupParticipant;
use App\GroupChat;
use App\Goal;
use DB;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $groups = Community::with('group', 'group.participants')
            ->where('type', 'group')
            ->paginate();

        foreach ($groups as $group) {
            $group->getMedia('photo');
        }

        return response()->json($groups, 200);
    }

    /**
     * Get join request in a group
     *
     * @return \Illuminate\Http\Response
     */
    public function getJoinRequest(Group $group)
    {
        $participants = GroupParticipant::with('user')
            ->where('group_id', $group->id)
            ->get();

        return response()->json($participants, 200);
    }

    /**
     * Get messages in group
     *
     * @return \Illuminate\Http\Response
     */
    public function message(Group $group)
    {
        $chats = GroupChat::with('user')
            ->where('group_id', $group->id)
            ->get();

        return response()->json($chats, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupStoreRequest $request, CommunityController $communityCtrl)
    {
        $result = DB::transaction(function () use ($request, $communityCtrl) {
                $community = $communityCtrl->store($request, 'group');

                $goal = Goal::make([
                    'term' => $request->term,
                    'need' => $request->need,
                ]);
                $community->goals()->save($goal);

                if ($request->hasFile('media')) {
                    $community
                        ->addMedia($request->file('media'))
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));
                    $community->getMedia('photo');
                }

                $group = Group::create([
                        'community_id' => $community->id,
                        'user_id' => auth()->user()->id
                    ]);

                $community['group'] = $group;

                return $community;
            });

        return response()->json([
                'message' => 'Successfully created',
                'data' => $result
            ], 202);
    }

    /**
     * Add Participant in a group
     *
     * @param Group group
     * @return \Illuminate\Http\Response
     */
    public function addParticipant(Group $group)
    {
        $result = GroupParticipant::create([
                'group_id' => $group->id,
                'user_id' => auth()->user()->id
            ]);

        return response()->json([
                'message' => 'Request successfully send',
                'data' => $result
            ], 202);
    }

    /**
     * Join request approval
     *
     * @param  request, group
     * @return \Illuminate\Http\Response
     */
    public function joinRequest(Request $request, Group $group)
    {
        try {
            GroupParticipant::where([
                ['group_id', '=', $group->id],
                ['user_id', '=', $request->participant]
            ])->update(['status' => $request->status]);

            return response()->json([
                    'message' => 'User successfully '.$request->status
                ], 202);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Please try again.'
            ], 500);
        }
    }

    /**
     * Add message in group
     *
     * @param  request, group
     * @return \Illuminate\Http\Response
     */
    public function addMessage(GroupMessageStoreRequest $request)
    {
        try {
            $message = GroupChat::create([
                    'group_id' => $request->group_id,
                    'sender' => auth()->user()->id,
                    'message' => $request->message,
                ]);

            return response()->json($message, 202);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Please try again.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Community::with('group', 'group.participants')
            ->where('id', $id)
            ->first();

        $group->getMedia('photo');

        return response()->json($group, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommunityUpdateRequest $request, $id)
    {
        //
        $community = Community::findOrFail($id);
        $community->update($request->validated());

        return response()->json($community, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        //
        try {
            $community = Community::find($group->community_id);

            $group->delete();
            $community->delete();
            
            return response()->json([
                    'message' => 'Group successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
