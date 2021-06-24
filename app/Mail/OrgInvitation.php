<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use App\Organization;
use App\OrgInvites;

class OrgInvitation extends Mailable
{
    use Queueable, SerializesModels;

    // protected $user;
    protected $org;
    protected $invite;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Organization $org, OrgInvites $invite)
    {
        $this->org = $org;
        $this->invite = $invite;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $user = $this->to[0];
        $expires = now()->addWeek();

        // $from = config('mail.from.address', 'info@lovelivesgenerously.demosite.ninja')
        //     ?? 'info@lovelivesgenerously.demosite.ninja';
            
        return $this//->from($from)
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->view('email.org_invite')
            ->subject('Account Invitation')
            ->with([
                'org' => $this->org,
                'expires' => $expires,
                'user' => $user,
                'url' => URL::temporarySignedRoute('complete.account', $expires, [
                    'email' => $user['address'] ?? 'missing', 
                    'token' => optional($this->invite)->token ])
            ]);
    }
}
