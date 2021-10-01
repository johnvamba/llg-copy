<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\User;
use App\Goal;

class GoalMonthlyReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'goal:monthly-reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will create a new goal in the month';

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
        Log::info("Goal monthly reset command is running...");

        $date = Carbon::now();

        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth   = $date->copy()->endOfMonth();

        /** monthly goal */

        $goals = Goal::whereNotBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('term', 'month')
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

        Log::info("Goal monthly reset command is stop...");

        $this->info('Goals has been reset');
    }
}
