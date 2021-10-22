<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Story;
use App\Organization;
use App\Mail\StoryPublished;
use Illuminate\Support\Facades\Mail;
use App\Jobs\Mail\OrgReport as Mailer;
use App\Mail\OrgReportMail;


class OrgReportEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:orgReport {--org_id=} {--email=}';

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
            $org = Organization::has('needs')
            ->first();

            $user = \App\User::where('email', $email)->first();

            Mail::to($user)->send(new OrgReportMail($org, now()->subWeek(), now()));

            $this->info('Email for story sent');
            return;
        }

        $this->info('Email is not present');

    }
}
