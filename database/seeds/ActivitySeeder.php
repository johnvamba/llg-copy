<?php

use Illuminate\Database\Seeder;
use App\Activity;
use App\Invoice;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $invoices = Invoice::all();

        $invoices->each(function($inv) {
        	
        });
    }
}
