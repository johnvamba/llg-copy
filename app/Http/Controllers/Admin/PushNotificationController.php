<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\PushNotification;
use Illuminate\Http\Request;
use App\Http\Resources\PushResource;
use Carbon\Carbon;

class PushNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $notifs = PushNotification::latest();

        if($status = $request->get('status')){
            $lower = strtolower($status);
            
            if($lower != 'all'){
                $notifs->where('status', $lower);
            }
        }

        return PushResource::collection($notifs->paginate());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $date = null;
        switch ($request->get('toggleSched')) {
            case 'later':
                $date = Carbon::parse($request->get('date'));
                $time = Carbon::parse($request->get('time'));
                $date->setTime($time->hour, $time->minute);
                break;
            case 'now':
            default:
                $date = now();
                break;
        }

        $notif = PushNotification::create( $request->only('title', 'message', 'status') + [
            'created_by' => auth()->user(),
            'scheduled_at' => $date
        ]);

        //Do something here


        return new PushResource($notif);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PushNotification  $pushNotification
     * @return \Illuminate\Http\Response
     */
    public function show(PushNotification $pushNotification)
    {
        return new PushResource($pushNotification);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PushNotification  $pushNotification
     * @return \Illuminate\Http\Response
     */
    public function edit(PushNotification $pushNotification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PushNotification  $pushNotification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PushNotification $pushNotification)
    {

        $date = null;
        switch ($request->get('toggleSched')) {
            case 'later':
                $date = Carbon::parse($request->get('date'));
                $time = Carbon::parse($request->get('time'));
                $date->setTime($time->hour, $time->minute);
                break;
            case 'now':
            default:
                $date = now();
                break;
        }

        $notif = $pushNotification::update( $request->only('title', 'message', 'status') + ['scheduled_at' => $date ]);
        //Do something here


        return new PushResource($notif);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PushNotification  $pushNotification
     * @return \Illuminate\Http\Response
     */
    public function destroy(PushNotification $pushNotification)
    {
        DB::beginTransaction();
        try {
            $pushNotification->delete();
            DB::commit();
            return response()->json('Removed Notification', 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage(), 400);
        }
    }
}
