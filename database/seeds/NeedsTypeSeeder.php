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
        NeedsType::create(['name' => 'Financial Donation', 'icon' => 'Donate.png']);
        NeedsType::create(['name' => 'Fundraise', 'icon' => 'Fundraise.png']);
        NeedsType::create(['name' => 'Volunteer Opportunities', 'icon' => 'Cleaning.png']);
    }
}
