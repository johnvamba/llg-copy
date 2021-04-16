<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

use App\Story;
use App\Mail\StoryPublished;

class StoryPublishing implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $story;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Story $story)
    {
        $story->loadMissing('organization.members');
        $this->story = $story;

    }
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $organization = $this->story->organization;
        $members = optional($organization)->members ?? collect(); 

        $members->each(function($user){
            dispatch(fn() => Mail::to($user)->send(new StoryPublished($this->story)) );
        });
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
