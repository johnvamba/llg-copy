<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\ReceiptTemplate;
use App\Organization;

class TransactionReceipt extends Mailable
{
    use Queueable, SerializesModels;

    protected $org;

    protected $transactions;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Organization $org, $transactions = [])
    {
        $this->org = $org;
        $this->transactions = $transactions;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
         $from = config('mail.from.address', 'info@lovelivesgenerously.demosite.ninja')
            ?? env('MAIL_FROM_ADDRESS', 'info@lovelivesgenerously.demosite.ninja')
            ?? 'info@lovelivesgenerously.demosite.ninja';
            
        return $this->from($from)->view('email.transact')
            ->subject(optional($this->org->template)->subject ?? 'Payment Received!')
            ->with([
                'org' => $this->org,
                'transacts' => $this->transactions,
                'paid' => array_sum($this->transactions),
                'template' => optional($this->org)->template
            ]);
    }
}
