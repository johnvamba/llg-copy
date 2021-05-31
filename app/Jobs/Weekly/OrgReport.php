<?php

namespace App\Jobs\Weekly;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Organization;
use App\Mail\OrgReportMail;
use App\Jobs\Mail\OrgReport as Mailer;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrgReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Log::channel('queues_error')->info('Logging org report');
        $orgs = Organization::whereHas('needs', function($needs) {
            $needs->whereHas('mets', function($mets) {
                $mets->whereBetween('need_mets.created_at', [now()->subWeek(), now()]);
            });
        })
        ->with('members')
        ->get();

        //Note. this might not be optimized but works nonetheless.
        $orgs->each(fn($org) => $org->members->each(fn($m) => dispatch( new Mailer ($m, $org, now()->subWeek(), now()) ) ) );
    }
}
