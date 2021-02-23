<?php

use Illuminate\Database\Seeder;
use App\Need;
use App\NeedMet;

class VolunteerSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Need::whereHas('type', fn($type) => $type->where('name', 'Volunteer'))
            ->get()
            ->each(function($need){
                $x = rand(1,5);
                for ($i=0; $i < $x; $i++) { 
                    $user = \App\User::withoutGlobalScopes()
                        ->inRandomOrder()
                        ->first();

                    if(!$user)
                        continue;

                    $makeNeedMet = NeedMet::firstOrCreate([
                        'need_id' => $need->id,
                        'amount' => 1,
                        'model_type' => 'App\User',
                        'model_id' => $user->id
                    ]);

                    if($makeNeedMet->wasRecentlyCreated)
                        $need->update([
                            'raised' => ($need->raised + 1)
                        ]);
                }
            });
    }
}
