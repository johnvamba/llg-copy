<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\OrgInvites;
use App\Organization;

use Illuminate\Support\Facades\Mail;
use App\Mail\OrgAccepted;
use App\Mail\OrgRejected;

use App\Need;

class OrgStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:org {--org=} {--email=} {--type=}';

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

        $org = Organization::find($this->option('org')) ?? Need::first();

        if($this->option('type') == 'reject') {
            Mail::to($this->option('email'))->send(new OrgRejected($org));
        } else {
            Mail::to($this->option('email'))->send(new OrgAccepted($org));
        }
    
        $this->info('Email sent to:' . $this->option('email'));
    }
}
