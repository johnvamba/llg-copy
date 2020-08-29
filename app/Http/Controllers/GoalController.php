<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GoalStoreRequest;
use App\Goal;

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
        $goal = Goal::make([
            'term' => $request->term,
            'need' => $request->need
        ]);

        $result = auth()->user()->goals()->save($goal);

        return response()->json([
                'success' => true,
                'message' => 'Sucessfully saved.',
                'data' => $result
            ], 202);
    }
}
