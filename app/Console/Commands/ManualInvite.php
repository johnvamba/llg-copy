<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\OrgInvites;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrgInvitation;
use App\Jobs\Mail\OrgInvite as JobOrgInvite;

class ManualInvite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invite:user {--email=} {--orgId=} {--dispatch}';

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
        $invitation = OrgInvites::with('organization')
            ->where('email', $this->option('email'))
            ->when($org = $this->option('orgId'), fn($q) => $q->where('org_id', $org))
            ->first();

        if(!$invitation) {
            $this->info('No invitation initiated for any organization to email.');
            return;
        }
            
        $organization = $invitation->organization;
        $invitation->unsetRelation('organization');
        $email = $this->option('email');

        if(!$organization || !$email){
            $this->info('Email invite not found or organization doesnt exist');
            return ;
        }

        if($this->option('dispatch')){
            dispatch(new JobOrgInvite($email, $organization, $invitation)); //Run this on production but with dispatch
        } else {
            Mail::to($email)->send(new OrgInvitation($organization, $invitation)); //Run this on production but with dispatch
        }

        $this->info('Email sent to:' . $this->option('email'));
    }
}
