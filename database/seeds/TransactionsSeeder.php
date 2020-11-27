<?php

use Illuminate\Database\Seeder;

use App\Invoice;
use App\Need;
use App\Organization;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $needs = Need::all();
        $orgs = Organization::all();
        $users = User::all();
        for ($i=0; $i < 20; $i++) { 
        	Invoice::create([
        		
        	]);
        }
    }
}
