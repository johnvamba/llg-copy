<?php

use Illuminate\Database\Seeder;

class NewCategoriesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Monetary
        \App\NeedsCategory::firstOrCreate(['name' => 'Prison', 'icon' => env('APP_URL').'/assets/icons/Prison.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Seniors', 'icon' => env('APP_URL').'/assets/icons/Senior.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Migrants', 'icon' => env('APP_URL').'/assets/icons/Refugee.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Homeless', 'icon' => env('APP_URL').'/assets/icons/Homeless.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Fostercare', 'icon' => env('APP_URL').'/assets/icons/Fostercare.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Mentoring', 'icon' => env('APP_URL').'/assets/icons/Mentoring.png']);
        \App\NeedsCategory::firstOrCreate(['name' => 'Admin', 'icon' => env('APP_URL').'/assets/icons/Admin.png']);
    }
}
