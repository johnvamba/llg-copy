<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrgInvitation extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    protected $org;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, Organization $org)
    {
        $this->user = $user;
        $this->org = $org;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.org_invite');
    }
}
