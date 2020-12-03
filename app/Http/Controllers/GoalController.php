<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Requests\GoalStoreRequest;
use App\Goal;
use App\User;
use App\Group;
use App\NeedMet;
use Carbon\Carbon;

class GoalController extends Controller
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
    public function update(GoalStoreRequest $request, Goal $goal)
    {
        //
        $goal->update($request->validated());
        return response()->json($goal, 202);
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

    /**
     * Set user goal
     * @param request
     * @return json
     */
    public function setUserGoal(GoalStoreRequest $request)
    {
        $user = User::find($request->id);

        $goal = Goal::make([
            'term' => $request->term,
            'need' => $request->need
        ]);

        $result = $user->goals()->save($goal);

        return response()->json($goal, 202);
    }

    /**
     * Get user goal
     * @param request
     * @return json
     */
    public function getUserGoal(Request $request)
    {
        $goal = Goal::whereHasMorph(
                'model',
                ['App\User'],
                function (Builder $query) {
                    $query->where('model_id', auth()->user()->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        $date = Carbon::parse($goal->created_at);
        
        if ($goal->term == 'year') {
            $goal['needs_met_count'] = NeedMet::whereHasMorph(
                    'model',
                    ['App\User'],
                    function (Builder $query) {
                        $query->where('model_id', auth()->user()->id);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfYear()->toDateString()
                ])
                ->groupBy('need_id')
                ->count();
        } else {
            $goal['needs_met_count'] = NeedMet::whereHasMorph(
                    'model',
                    ['App\User'],
                    function (Builder $query) {
                        $query->where('model_id', auth()->user()->id);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString()
                ])
                ->groupBy('need_id')
                ->count();
        }

        return response()->json($goal, 200);
    }

    /**
     * Update group goal
     * @param request
     * @return json
     */
    public function updateGroupGoal(Request $request, Group $group)
    {
        $goal = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function($query) use ($request, $group) {
                    $query->where('model_id', $group->id);
                }
            )->first();

        $goal->update([
                'need' => $request->need,
                'term' => $request->term
            ]);

        return response()->json($goal, 202);
    }
    
    /**
     * Get group goal
     * @param request
     * @return json
     */
    public function getGroupGoal(Request $request, Group $group)
    {
        $fetchGroup = Group::with(['goals' => function($query) {
                $query->where('status', 'in progress')
                    ->orderBy('created_at')
                    ->first();
            }])
            ->find($group->id);

        // $date = Carbon::parse($goal->created_at);
        
        // if ($goal->term == 'year') {
        //     $goal['needs_met'] = NeedMet::where('created_at', '>=', $date->toDateTimeString())
        //         ->where('created_at', '<=', $date->copy()->endOfYear())
        //         ->get();
        // } else {
        //     $goal['needs_met'] = NeedMet::where('created_at', '>=', $date->toDateTimeString())
        //     ->where('created_at', '<=', $date->copy()->endOfMonth())
        //     ->get();
        // }

        return response()->json($fetchGroup, 200);
    }
}
