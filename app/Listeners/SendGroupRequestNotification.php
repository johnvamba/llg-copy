<?php

namespace App\Listeners;

use App\Events\GroupRequestEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use App\Group;
use App\Device;
use FCM;

class SendGroupRequestNotification
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
     * @param  GroupRequestEvent  $event
     * @return void
     */
    public function handle(GroupRequestEvent $event)
    {
        $group = Group::find($event->params['group_id']);

        $tokens = Device::where('user_id', $event->params['user_id'])
            ->pluck('fcm_token');
        
        if (!$tokens->count())
            return;

        $notification = [
            // "tokens" => $tokens->toArray(),
            "tokens" => ['eEdCRa6ITPCC1o2UYTVATH:APA91bG9FhrbYJfeXSfioE0RtWwNnuvUMan_DWsHv1gzfp55UaflHhySB-vbrIyz_vtoXTnl5JxO8OzoE8bA7E8Qxo7inaXYmp_kdawxbsuCXad3BVczGcT9N3gtcJ4EJmzIjYGSdzqu'],
            "data" => [
                'message' => $event->params['isApproved'] 
                    ? "Your request from group $group->name has been approved" 
                    : "Your request from group $group->name has been rejected",
                'type' => 'group_request'
            ]
        ];

        $this->sendNotification($notification, $group);
    }

    public function sendNotification($notification, $group)
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder('Group Joined Response');
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
    public function failed(GroupRequestEvent $event, $exception)
    {
        \App::Log("failed group message notification");
    }
}
