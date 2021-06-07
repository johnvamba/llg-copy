<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Need;
use App\Mail\NeedApproved;
use App\Mail\NeedRejected;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NeedStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $approved = false;

    protected $need;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($need, $approved = false)
    {
        $this->need = $need;
        $this->approved = $approved;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        optional($this->need)->loadMissing(['organization'=>function($org){
            $org->withoutGlobalScopes()->with(['members' => fn($m) => $m->unfilter()]);
        }]);

        $tosend = optional($this->need->organization)->members ?? collect();
        $need = $this->need;
        if($this->approved) {
            $tosend->each(function($user) use ($need){
                Mail::to($user)->send(new NeedApproved($need));
            });
        } else {
            $tosend->each(function($user) use ($need){
                Mail::to($user)->send(new NeedRejected($need));
            });
        }

    }
}
