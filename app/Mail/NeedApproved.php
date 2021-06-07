<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Need;

class NeedApproved extends Mailable
{
    use Queueable, SerializesModels;

    // protected $user;
    protected $need;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Need $need)
    {
        $this->need = $need;
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
            ->subject("Your Need Request has been approved!")
            ->view('email.need_approve')
            ->with([
                'need' => $this->need,
                'url' => '',
                'user' => $this->to
            ]);
    }
}
