<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Organization;

class OrgAccepted extends Mailable
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
        return $this
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject("You have been approved!")
            ->view('email.org_approved')
            ->with([
                'org' => $this->org,
                'url' => '',
                'user' => $this->to
            ]);
    }
}
