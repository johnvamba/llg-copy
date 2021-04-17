<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\OfferApprove;
use Illuminate\Support\Facades\Mail;

use App\ServiceOffer;

class OfferEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:offer {--offer_id=} {--email=} {--dispatch}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if($email = $this->option('email')) {
            $story = ServiceOffer::find($this->option('offer_id')) ?? ServiceOffer::first();

            if(!$story){
                $this->info('Missing story to send to user. Possibly nothing at all');
                return;
            }

            if($this->option('dispatch')){
                dispatch(fn() => Mail::to($email)->send(new OfferApprove($story, false))); //Run this on production but with dispatch
            } else {
                Mail::to($email)->send(new OfferApprove($story));
            }

            $this->info('Email for story sent');
            return;
        }

        $this->info('Email is not present');

    }
}
