<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Organization;

class NewOrgEmail extends Mailable
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
         $from = config('mail.from.address', 'info@lovelivesgenerously.demosite.ninja')
            ?? 'info@lovelivesgenerously.demosite.ninja';
        $organization = $this->org;
        return $this->from($from)->view('email.org_new')
            ->with([
                'org' => $this->org,
                'url' => route('complete.organisation', compact('organization')),
                'user' => $this->to
            ]);
    }
}
