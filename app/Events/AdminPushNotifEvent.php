<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\PushNotification;

class AdminPushNotifEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notif = null;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PushNotification $notif)
    {
        $this->notif = $notif;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('general');
    }
}
