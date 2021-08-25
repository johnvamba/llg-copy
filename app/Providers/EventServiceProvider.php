<?php

namespace App\Providers;

use App\Events\GroupInvite;
use App\Events\GroupMessage;
use App\Events\GroupRequestEvent;
use App\Listeners\SendInvitationNotification;
use App\Listeners\SendMessageNotification;
use App\Listeners\SendGroupRequestNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        GroupInvite::class => [
            SendInvitationNotification::class,
        ],
        GroupMessage::class => [
            SendMessageNotification::class,
        ],
        GroupRequestEvent::class => [
            SendGroupRequestNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
