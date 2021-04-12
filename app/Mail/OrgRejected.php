<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Organization;

class OrgRejected extends Mailable
{
    use Queueable, SerializesModels;

    // protected $user;
    protected $org;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($org)
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
            ->subject("Your application has been declined")
            ->view('email.org_reject')
            ->with([
                'org' => $this->org,
                'url' => '',
                'user' => $this->to
            ]);
    }
}
