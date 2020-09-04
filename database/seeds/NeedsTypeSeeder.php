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
        NeedsType::create(['name' => 'Financial Donation']);
        NeedsType::create(['name' => 'Fundraise']);
        NeedsType::create(['name' => 'Volunteer Opportunities']);
    }
}
