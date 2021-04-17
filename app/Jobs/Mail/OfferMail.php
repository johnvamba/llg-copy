<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Mail\OfferApprove;
use App\ServiceOffer;
use App\Organization;
use App\Campus;
use App\Group;
use App\User;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class OfferMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $offer;
    protected $accepted = false;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(ServiceOffer $offer, $accepted = false)
    {
        $this->offer = $offer;
        $this->accepted = $accepted;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->offer->loadMissing('model');

        if($model = $this->offer->model) {
            $sendto = collect([]);

            switch (get_class($model)) {
                case Campus::class:
                $sendto = $model->users; //load users
                    break;
                case Organization::class:
                $sendto = $model->members;
                    break;
                case Group::class:
                // $sendto = 
                    break;
                case User::class:
                $sendto = collect([ $model ]);
                    break;
                default:
                    break;
            }

            $offer = $this->offer;
            $accepted = $this->accepted;

            // Log::channel('queues_error')
            //     ->info("status", $sendto->toArray() );

            $sendto->each(function($user) use ($offer, $accepted) {
                dispatch(fn() => Mail::to($user)->send(new OfferApprove($offer, $accepted)) );
            });
        }
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
