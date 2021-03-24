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

        $tosend = optional($this->org)->members ?? collect();
        $org = $this->org;
        if($this->approved) {
            $tosend->each(function($user) use ($org){
                dispatch(fn() => Mail::to($user)->send(new OrgAccepted($org)));
            });
        } else {
            $tosend->each(function($user) use ($org){
                dispatch(fn() => Mail::to($user)->send(new OrgRejected($org)));
            });
        }
    }
}
