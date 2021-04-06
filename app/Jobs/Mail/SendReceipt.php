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
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $transacts = 'Donation on need#'. optional($this->need)->id;
        $organization = optional($this->need)->organization;

        if($organization && $transacts && $this->user){
            Mail::to($this->user)->send(new TransactionReceipt($organization, [  $transacts => $this->amount ?? 0 ]));
        }
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
