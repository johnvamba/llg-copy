<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Need;
use App\User;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\NeedMetMail;

class NeedMetMailer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $need;
    protected $user;
    protected $transaction = 0;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Need $need, User $user, $transaction = 0)
    {
        $need->loadMissing('type');
        $this->need = $need;
        $this->user = $user;
        $this->transaction = $transaction;
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
        $actor = $this->user;
        $transaction = $this->transaction;

        $tosend->each(function($user) use ($need, $actor, $transaction){
            dispatch(fn() => Mail::to($user)->send(new NeedMetMail($need, $actor, $transaction)));
        });
    }

        public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
