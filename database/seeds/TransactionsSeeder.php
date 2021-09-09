<?php

use Illuminate\Database\Seeder;

use App\Invoice;
use App\Need;
use App\NeedMet;
use App\Organization;
use App\User;
use Illuminate\Support\Str;
use Carbon\Carbon;

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
        for ($i=0; $i < 100; $i++) { 
        	$need = $needs->random();
        	//Update me to increment value donated by users.
            $date = Carbon::now()->subDays(rand(1, 365));
            $user = $users->random()->id;
            $amount = number_format(rand(0, 5000) / rand(2,9), 2);

        	$invoice = Invoice::create([
        		'model_id' => $need->id,
        		'model_type' => Need::class,
        		'charge_id' => Str::random(12),
        		'user_id' => $user,
        		'organization_id' => $orgs->random()->id,
        		'amount' => $amount,
                'created_at' => $date,
                'updated_at' => $date
        	]);

            NeedMet::create([
                'need_id' => $need->id,
                'model_type' => User::class,
                'model_id' => $user,
                'amount' => $amount,
                'created_at' => $date,
                'updated_at' => $date
            ]);
        }
    }
}
