<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Jobs\Weekly\OrgReport;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
        'App\Console\Commands\GoalMonthlyReset',
        'App\Console\Commands\GoalYearlyReset',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        /***
         *  Command to reset the goal monthly and yearly
         */
        $schedule->command('goal:monthly-reset')->everyMinute();
        $schedule->command('goal:yearly-reset')->everyMinute();


        $schedule->job(new OrgReport)->weeklyOn(1, "8:00");
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
