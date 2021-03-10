<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Story;
use App\Mail\StoryPublished;
use Illuminate\Support\Facades\Mail;


class StoryEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:story {--story_id=} {--email=} {--dispatch}';

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
            $story = Story::find($this->option('story_id')) ?? Story::first();

            if(!$story){
                $this->info('Missing story to send to user. Possibly nothing at all');
                return;
            }

            if($this->option('dispatch')){
                dispatch(fn() => Mail::to($email)->send(new StoryPublished($story))); //Run this on production but with dispatch
            } else {
                Mail::to($email)->send(new StoryPublished($story));
            }

            $this->info('Email for story sent');
            return;
        }

        $this->info('Email is not present');

    }
}
