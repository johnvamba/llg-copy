<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Log;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\User;
use App\Goal;

class GoalReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'goal:reset';

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
        $goals = Goal::whereDate('created_at', '<=', Carbon::now()->toDateTimeString())
            ->where('reset', false)
            ->get();

        foreach($goals as $goal) {
            $params = ['reset' => true];

            if ($goal->status == 'in progress') {
                $params['status'] = 'done';
            }

            Goal::find($goal->id)->update($params);

            Goal::create([
                'model_type' => $goal->model_type,
                'model_id' => $goal->model_id,
                'term' => $goal->term,
                'need' => $goal->need
            ]);
        }

        $this->info('Goals has been reset');
    }
}
