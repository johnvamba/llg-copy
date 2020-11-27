<?php

use Illuminate\Database\Seeder;

use App\Invoice;
use App\Need;
use App\Organization;
use App\User;
use Illuminate\Support\Str;

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
        	$need = $needs->random();
        	//Update me to increment value donated by users.
        	Invoice::create([
        		'model_id' => $need->id,
        		'model_type' => Need::class,
        		'charge_id' => Str::random(12),
        		'user_id' => $users->random()->id,
        		'organization_id' => $orgs->random()->id,
        		'amount' => number_format(rand(0, 5000) / rand(2,9), 2)
        	]);
        }
    }
}
