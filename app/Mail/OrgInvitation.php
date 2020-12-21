<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Organization;

class OrgInvitation extends Mailable
{
    use Queueable, SerializesModels;

    // protected $user;
    protected $org;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Organization $org)
    {
        $this->org = $org;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS', 'info@lovelivesgenerously.demosite.ninja'))
            ->view('email.org_invite')
            ->with([
                'org' => $this->org,
                'user' => $this->to
            ]);
    }
}
