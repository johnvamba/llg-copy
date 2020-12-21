<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GroupInvitation extends Mailable
{
    use Queueable, SerializesModels;

    protected $group;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($group)
    {
        $this->group = $group;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS', 'info@lovelivesgenerously.demosite.ninja'))
            ->view('email.group_invite')
            ->with([
                'group' => $this->group,
                'user' => $this->to
            ]);
    }
}
