<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

// use App\ServiceOffer;

class OfferApprove extends Mailable
{
    use Queueable, SerializesModels;

    protected $offer;
    protected $accepted = false;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($offer, $accepted = true)
    {
        $this->offer = $offer;
        $this->accepted = $accepted;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = $this->accepted ? "Your Offer Request have been Approved!" : "Your Offer Request has not been approved!";
        $view = $this->accepted ? 'email.offer_approve' : "email.offer_reject";

        return $this
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject($subject)
            ->view($view)
            ->with([
                'offer' => $this->offer,
                'user' => $this->to
            ]);
    }
}
