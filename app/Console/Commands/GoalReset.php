<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $date = Carbon::now();

        $startOfYear = $date->copy()->startOfYear();
        $endOfYear = $date->copy()->endOfYear();

        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth   = $date->copy()->endOfMonth();

        /** yearly goal */

        $yearly_goals = Goal::whereNotBetween('created_at', [$startOfYear, $endOfYear])
            ->where('term', 'year')
            ->where('reset', false)
            ->get();    
            
        foreach($yearly_goals as $goal) {
            $params = ['reset' => true];

            if ($goal->status == 'in progress') {
                $params['status'] = 'done';
            }

            Goal::find($goal->id)->update(params);

            $user = User::find($goal->model_id);

            $makeGoal = Goal::make([
                    'term' => $goal->term,
                    'need' => $goal->need
                ]);

            $user->goal()->save($makeGoal);
        }

        /** monthly goal */

        $monthly_goals = Goal::whereNotBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('term', 'month')
            ->where('reset', false)
            ->get();

        foreach($monthly_goals as $goal) {
            $params = ['reset' => true];

            if ($goal->status == 'in progress') {
                $params['status'] = 'done';
            }

            Goal::find($goal->id)->update(params);

            $user = User::find($goal->model_id);

            $makeGoal = Goal::make([
                    'term' => $goal->term,
                    'need' => $goal->need
                ]);

            $user->goal()->save($makeGoal);
        }

        $this->info('Goals has been reset');
    }
}
