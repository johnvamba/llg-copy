<?php

use Illuminate\Database\Seeder;
use App\NeedsType;

class NeedsTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        NeedsType::create(['name' => 'Donation', 'icon' => env('APP_URL').'/assets/icons/Donate.png']);
        NeedsType::create(['name' => 'Fundraise', 'icon' => env('APP_URL').'/assets/icons/Fundraise.png']);
        NeedsType::create(['name' => 'Volunteer', 'icon' => env('APP_URL').'/assets/icons/Cleaning.png']);
    }
}
