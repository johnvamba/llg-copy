<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\OrgInvites;
use App\Organization;

use Illuminate\Support\Facades\Mail;
use App\Mail\NeedApproved;
use App\Mail\NeedRejected;

use App\Need;

class NeedStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:need {--need=} {--email=} {--type=}';

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

        $need = Need::find($this->option('need')) ?? Need::first();

        if($this->option('type') == 'reject') {
            Mail::to($this->option('email'))->send(new NeedRejected($org));
        } else {
            Mail::to($this->option('email'))->send(new NeedApproved($org));
        }
    
        $this->info('Email sent to:' . $this->option('email'));
    }
}
