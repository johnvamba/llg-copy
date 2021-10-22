<?php

namespace App\Listeners;

use App\Events\GroupMessageEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use App\GroupParticipant;
use App\Group;
use App\Device;
use FCM;

class SendMessageNotification
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
     * @param  GroupMessageEvent  $event
     * @return void
     */
    public function handle(GroupMessageEvent $event)
    {
        $group = Group::find($event->params->group_id);

        $participants = GroupParticipant::where(function($query) use ($event) {
                $query->where('group_id', $event->params->group_id)
                    ->where('user_id', '!=', $event->params->sender)
                    ->where('status', 'approved');
            })
            ->pluck('user_id');

        if (auth()->user()->id != $event->params->sender) {
            $participants->push(auth()->user()->id);
        }

        $tokens = Device::whereIn('user_id', $participants)
            ->pluck('fcm_token');
        
        if (!$tokens->count())
            return;

        $notification = [
            "tokens" => $tokens->toArray(),
            "data" => [
                'message' => $event->params['message'],
                'type' => 'group_message'
            ]
        ];

        $this->sendNotification($notification, $group);
    }

    public function sendNotification($notification, $group)
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder($group->name);
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
    public function failed(GroupMessageEvent $event, $exception)
    {
        \App::Log("failed group message notification");
    }
}
