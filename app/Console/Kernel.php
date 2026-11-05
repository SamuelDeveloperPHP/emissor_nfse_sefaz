<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Shared hosting has no long-running worker: one cron entry runs `schedule:run` every minute.
        $schedule->command('queue:work --stop-when-empty --max-time=50')->everyMinute()->withoutOverlapping();
        $schedule->command('nfse:consultar-pendentes')->everyFiveMinutes()->withoutOverlapping();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
