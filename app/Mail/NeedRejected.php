<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Need;

class NeedRejected extends Mailable
{
    use Queueable, SerializesModels;

    // protected $user;
    protected $need;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($need)
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
            ->subject("Your Need Request has not been approved.")
            ->view('email.need_reject')
            ->with([
                'need' => $this->need,
                'url' => '',
                'user' => $this->to
            ]);
    }
}
