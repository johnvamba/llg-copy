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
        ServiceType::create(['name' => 'Employment']);
        ServiceType::create(['name' => 'Merchanic']);
        ServiceType::create(['name' => 'Cleaning']);
        ServiceType::create(['name' => 'Removalist']);
        ServiceType::create(['name' => 'Tutor']);
        ServiceType::create(['name' => 'Counselling']);
        ServiceType::create(['name' => 'Legal Assistance']);
        ServiceType::create(['name' => 'Translation']);
        ServiceType::create(['name' => 'Other']);
    }
}
