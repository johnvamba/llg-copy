<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\User;
use App\Need;

class NeedMetMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $need;
    protected $user;
    protected $transaction = 0;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Need $need, User $user, $transaction = 0)
    {
        $need->loadMissing('type');
        $this->need = $need;
        $this->user = $user;
        $this->transaction = $transaction;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = '';
        switch ($this->need->type->name) {
            case 'Volunteer':
                $subject = 'New Volunteer';
                break;
            case 'Fundraise':
            case 'Donation':
            default:
                $subject = 'New Donation';
                break;
        }
        return $this->view('email.need_met')
            ->subject($subject)
            ->with([
                'need' => $this->need,
                'user' => $this->user,
                'transaction' => $this->transaction,
                'receiver' = $this->to
            ]);
    }
}
