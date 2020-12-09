<?php

use Illuminate\Database\Seeder;
use App\ServiceType;
use App\ServiceOffer;
use App\User;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ServiceType::all();

        $users = User::where('email', 'like', 'org%')->get();

        $users->each(function($user) use ($types){
            \factory(ServiceOffer::class)->create([
                'model_type' => User::class,
                'model_id' => $user->id,
                'service_type_id' => $types->random()->id,
            ]);
        });
        // for ($i=0; $i < 20; $i++) { 
        // 	\factory(ServiceOffer::class)->create([
        // 		'service_type_id' => $types->random()->id,
        // 	]);
        // }
    }
}
