<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrgInvitation;
use App\OrgInvites;
use App\Organization;

class OrgInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email;

    protected $organization;
    protected $invitation;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, Organization $organization, OrgInvites $invitation)
    {
        $this->email = $email;
        $this->organization = $organization;
        $this->invitation = $invitation;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::channel('queues_error')->info("Logging email: ". $this->email);
        Mail::to($this->email)->send(new OrgInvitation($this->organization, $this->invitation));
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
