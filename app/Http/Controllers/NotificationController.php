<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use App\Events\GroupInvite as GroupInviteEvent;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $recentNotifications = Notification::with(['from', 'to'])->where('to', auth()->user()->id)
            ->latest()
            ->with('model')
            ->skip(0)
            ->take(3)
            ->get();

        $earlierNotifications = Notification::with(['from', 'to'])->where('to', auth()->user()->id)
            ->latest()
            ->with('model')    
            ->skip(3)
            ->take(3)
            ->get();

        $notifications = [
            'recent' => $recentNotifications,
            'earlier' => $earlierNotifications
        ];

        return response()->json($notifications);
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
    public function destroy($id)
    {
        //
    }
}
