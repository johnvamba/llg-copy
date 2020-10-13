<?php

use Illuminate\Database\Seeder;
use App\ServiceType;

class ServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        ServiceType::create(['name' => 'Employment', 'icon' => 'Employment.png']);
        ServiceType::create(['name' => 'Merchanic', 'icon' => 'Mechanic.png']);
        ServiceType::create(['name' => 'Cleaning', 'icon' => 'OfferCleaning.png']);
        ServiceType::create(['name' => 'Removalist', 'icon' => 'Removalist.png']);
        ServiceType::create(['name' => 'Tutor', 'icon' => 'Tutor.png']);
        ServiceType::create(['name' => 'Counselling', 'icon' => 'Counselling.png']);
        ServiceType::create(['name' => 'Legal Assistance', 'icon' => 'LegalAssistance.png']);
        ServiceType::create(['name' => 'Translation', 'icon' => 'Translation.png']);
        ServiceType::create(['name' => 'Other']);
    }
}
