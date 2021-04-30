<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Organization;

use App\Mail\OrgAccepted;
use App\Mail\OrgRejected;
use App\Jobs\Mail\BulkOrgInvite;
use App\Jobs\Mail\OrgInvite as MailInvite;
use App\OrgInvites;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class OrgStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $approved = false;

    protected $org;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($org, $approved = false)
    {
        $this->org = $org;
        $this->approved = $approved;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        optional($this->org)->loadMissing(['members']);

        // $tosend = optional($this->org)->members ?? collect();
        $org = $this->org;
        $tosend = OrgInvites::where('org_id', $org->id)->get();
        if($this->approved) {
            $tosend->each(function($inv) use ($org){
                dispatch(fn() => Mail::to(optional($inv)->email)->send(new OrgAccepted($org)));
                dispatch(new MailInvite(optional($inv)->email, $org, $inv));
            });
        } else {
            // $tosend->each(function($inv) use ($org){
            //     dispatch(fn() => Mail::to(optional($inv)->email)->send(new OrgRejected($org)));
            // });
        }
    }
}
