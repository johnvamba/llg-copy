<?php

use Illuminate\Database\Seeder;
use App\ServiceOffer;
use App\ReportUse;

class ReportUseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $offers = ServiceOffer::where('status', 'approved')
            ->get()
            ->each(function($offer) use ($faker) {
                for ($x=0; $x < 10; $x++) { 
                    $user = \App\User::inRandomOrder()->whereHas('roles', fn($role) => $role->where('name', 'organization admin'))->first();

                    ReportUse::create([
                        'thumbs' => $faker->randomElement(['up', 'down', 'neutral']),
                        'user_id' => $user->id, 
                        'offer_id' => $offer->id,
                        'comment' => $faker->text
                    ]);
                }
            });
    }
}
