<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GoalStoreRequest;
use App\Goal;
use App\User;

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
        $goal = Goal::where([
                ['model_type', 'App\User'],
                ['model_id', auth()->user()->id]
            ])
            ->orderBy('id', 'desc')
            ->first();

        return response()->json($goal, 200);
    }
}
