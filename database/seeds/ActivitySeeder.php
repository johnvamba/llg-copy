<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use App\Activity;
use App\Invoice;
use App\Need;
use Carbon\Carbon;
use App\NeedMet;
use App\User;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $needs = Need::all()
        ->each(function($need) {
            $step = rand(1, 3);

            for ($i=0; $i < $step; $i++) { 
                $date = Carbon::now()
                    ->subDays(rand(0,2))
                    ->subMinutes(rand(1, 55));
                $amount = rand(500, 2000) / 100;

                $need->update([
                    'raised' => floatval($need->raised) + floatval($amount)
                ]);

                $user = User::with('profile')->inRandomOrder()->first();

                NeedMet::create([
                    'need_id' => $need->id,
                    'amount' => floatval($amount),
                    'model_type' => User::class,
                    'model_id' => $user->id,
                    'created_at' => $date,
                    'updated_at' => $date
                ]);

                optional($user->profile)->update([
                    'amount_given' => optional($user->profile)->amount_given + floatval($amount),
                    'updated_at' => $date
                ]);

                Activity::create([
                    'user_id' => $user->id,
                    'description' => 'donated ',
                    'short_description' => "$ ". number_format($amount, 2),
                    'model_type' => get_class($need),
                    'model_id' => $need->id,
                    'created_at' => $date,
                    'updated_at' => $date
                ]);

                Invoice::create([
                    'model_id' => $need->id,
                    'model_type' => Need::class,
                    'charge_id' => Str::random(12),
                    'user_id' => $user->id,
                    'organization_id' => $need->organization_id,
                    'amount' => number_format($amount, 2)
                ]);
            }
        });
    }
}
