<?php

namespace App\Listeners;

use App\Events\GroupInvite;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        dd($event);
    }
}
