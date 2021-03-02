<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Activity;
use Carbon\Carbon;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activities = Activity::with('user.profile')
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($activities as $activity) {
            $activity->model;
        }

        return response()->json($activities);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function recent(Request $request)
    {
        $date = Carbon::parse($request->date)
            ->toDateString();

        $activities = Activity::with('user', 'user.profile')
            ->whereDate('created_at', $date)
            ->limit($request->limit)
            ->get();

        foreach ($activities as $activity) {
            $activity->model;
        }

        return response()->json($activities);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($model, $details)
    {
        //
        $initActivity = Activity::make([
                'user_id' => auth()->user()->id,
                'description' => $details['description'],
                'short_description' => $details['short_description'],
            ]);

        $activity = $model->activity()->save($initActivity);

        return $activity;
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
    public function destroy($id)
    {
        //
    }
}
