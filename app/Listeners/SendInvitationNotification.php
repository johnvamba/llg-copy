<?php

namespace App\Listeners;

use App\Events\GroupInvite;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use App\Device;
use FCM;

class SendInvitationNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  GroupInvite  $event
     * @return void
     */
    public function handle(GroupInvite $event)
    {
        //
        $tokens = Device::where('user_id', $event->params['to'])
            ->pluck('fcm_token');
        
        if (!$tokens->count())
            return;

        $notification = [
            "tokens" => $tokens->toArray(),
            "data" => [
                'message' => $event->params['description']
            ]
        ];

        $this->sendNotification($notification);
    }

    public function sendNotification($notification)
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder('Group Invitation');
        $notificationBuilder->setBody($notification['data']['message'])
                            ->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData(['data' => json_encode($notification['data'], true)]);

        $option = $optionBuilder->build();
        $notificationBuild = $notificationBuilder->build();
        $data = $dataBuilder->build();

        $downstreamResponse = FCM::sendTo($notification['tokens'], $option, $notificationBuild, $data);

        return;
    }

    /** 
     * Handle a job failure.
    */
    public function failed(GroupInvite $event, $exception)
    {
        \App::Log("failed group invitation notification");
    }
}
