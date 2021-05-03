<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Mail\OrgReportMail;
use Illuminate\Support\Facades\Mail;

class OrgReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $org;
    protected $startDate;
    protected $endDate;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $org, $startDate, $endDate)
    {
        $this->user = $user;
        $this->org = $org;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $m = $this->user;
        $org = $this->org;
        $startDate = $this->startDate;
        $endDate = $this->endDate;

        Mail::to($m)->send( new OrgReportMail( $org, $startDate, $endDate ) );
    }
}
