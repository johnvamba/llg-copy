<?php

use Illuminate\Database\Seeder;
use App\NeedsMetType;

class NeedsMetTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        NeedsMetType::create(['name' => 'Financial Donation']);
        NeedsMetType::create(['name' => 'Fundraise']);
        NeedsMetType::create(['name' => 'Volunteer Opportunities']);
    }
}
