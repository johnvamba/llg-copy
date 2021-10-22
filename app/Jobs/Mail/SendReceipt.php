<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionReceipt;
use Illuminate\Support\Facades\Log;
use App\Jobs\Mail\NeedMetMailer;

class SendReceipt implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $need;
    protected $amount;
    protected $user;
    
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($need, $user, $amount)
    {
        $this->need = $need;
        $this->user = $user;
        $this->amount = $amount;

        dispatch(new NeedMetMailer($need, $user, $amount));
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $transacts = 'Donation on need entitled "'. (optional($this->need)->title ?? '-missing-need-') .'"';
        $organization = optional($this->need)->organization;

        if($organization && $transacts && $this->user){
            Mail::to($this->user)->send(new TransactionReceipt($organization, $this->user, [  $transacts => $this->amount ?? 0 ]));
        }
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
