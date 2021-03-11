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
         $from = config('mail.from.address', 'info@lovelivesgenerously.demosite.ninja')
            ?? 'info@lovelivesgenerously.demosite.ninja';
            
        return $this//->from($from)
            ->subject('You are invited to a group')
            ->view('email.group_invite')
            ->with([
                'group' => $this->group,
                'user' => $this->to
            ]);
    }
}
