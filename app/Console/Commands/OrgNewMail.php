<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\OrgInvites;
use App\Organization;

use Illuminate\Support\Facades\Mail;
use App\Mail\OrgInvitation;
use App\Jobs\Mail\OrgInvite as JobOrgInvite;
use App\Mail\NewOrgEmail;

class OrgNewMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'new:org {--orgId=} {--email=}';

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

        $org = Organization::unfilter()->find($this->option('orgId'));

        Mail::to($this->option('email'))->send(new NewOrgEmail($org));
    
        $this->info('Email sent to:' . $this->option('email'));
    }
}
