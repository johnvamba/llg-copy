<?php

use Illuminate\Database\Seeder;
use App\ServiceType;
use App\ServiceOffer;

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

        for ($i=0; $i < 15 ; $i++) { 
        	\factory(ServiceOffer::class)->create([
        		'service_type_id' => $types->random()->id,
        	]);
        }
    }
}
