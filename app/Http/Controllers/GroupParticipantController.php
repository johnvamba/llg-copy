<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\GroupParticipant;

class GroupParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Group $group, $page = 1)
    {
        $participants = GroupParticipant::with(
                'user', 
                'user.profile',
                'group'
            )
            ->where('group_id', $group->id)
            ->where('status', 'approved')
            ->paginate(10, ['*'], 'group_participant', $page);

        return response()->json($participants);
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(GroupParticipant $groupParticipant)
    {
        try {
            $groupParticipant->delete();
            
            return response()->json([
                    'message' => 'Request successfully removed.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function cancelRequest(Request $request, $id)
    {
        try {
            GroupParticipant::where([
                ['group_id', $id],
                ['user_id', auth()->user()->id]
            ])->delete();

            return response()->json([
                    'message' => 'Request successfully removed.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }

    public function getGroupsParticipated(Request $request)
    {
        $results = GroupParticipant::where([
            ['user_id', auth()->user()->id],
            ['status', 'approved']
        ])->pluck('group_id');

        return response()->json($results);
    }

    public function getGroupsRequested(Request $request)
    {
        $results = GroupParticipant::where(function($q) use ($request) {
            $q->where('user_id', auth()->user()->id)
                ->where('status', 'pending');
        })->pluck('group_id');

        return response()->json($results);
    }
}
