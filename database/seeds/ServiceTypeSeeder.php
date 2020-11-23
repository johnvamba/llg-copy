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
        ServiceType::create(['name' => 'Employment', 'icon' => env('APP_URL').'/assets/icons/Employment.png']);
        ServiceType::create(['name' => 'Mechanic', 'icon' => env('APP_URL').'/assets/icons/Mechanic.png']);
        ServiceType::create(['name' => 'Cleaning', 'icon' => env('APP_URL').'/assets/icons/OfferCleaning.png']);
        ServiceType::create(['name' => 'Removalist', 'icon' => env('APP_URL').'/assets/icons/Removalist.png']);
        ServiceType::create(['name' => 'Tutor', 'icon' => env('APP_URL').'/assets/icons/Tutor.png']);
        ServiceType::create(['name' => 'Counselling', 'icon' => env('APP_URL').'/assets/icons/Counselling.png']);
        ServiceType::create(['name' => 'Legal Assistance', 'icon' => env('APP_URL').'/assets/icons/LegalAssistance.png']);
        ServiceType::create(['name' => 'Translation', 'icon' => env('APP_URL').'/assets/icons/Translation.png']);
        ServiceType::create(['name' => 'Handyman', 'icon' => env('APP_URL').'/assets/icons/Handyman.png']);
        ServiceType::create(['name' => 'Gardener', 'icon' => env('APP_URL').'/assets/icons/Gardener.png']);
        ServiceType::create(['name' => 'Driver', 'icon' => env('APP_URL').'/assets/icons/Driver.png']);
        ServiceType::create(['name' => 'Cook', 'icon' => env('APP_URL').'/assets/icons/Cook.png']);
        ServiceType::create(['name' => 'Hairdresser', 'icon' => env('APP_URL').'/assets/icons/Hairdresser.png']);
        ServiceType::create(['name' => 'Other']);
    }
}
