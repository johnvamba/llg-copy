<?php

namespace App\Jobs\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\NewOrgEmail;
use App\User;
use App\Organization;

class OrgCreated implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    protected $organization;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Organization $organization)
    {
        $this->organization = $organization;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $organization = $this->organization;

        $users = User::unfilter()
            ->role('admin')
            ->orWhereHas('campus', function($camp) use ($organization){
                $camp->whereHas('organizations', fn($org) => $org->where('organizations.id', $organization->id));
            })->get();
        // $campus
        $users->each(function($user) use ($organization){
            dispatch(fn() => Mail::to($user)->send(new NewOrgEmail($organization)) );
        });
    }

    public function failed($exception = null)
    {
        Log::channel('queues_error')
            ->info($exception->getMessage(), 
                array('stacktrace' => $exception->getTrace()));
    }
}
