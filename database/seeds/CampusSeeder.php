<?php

use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Campus::create([
            'name' => 'Melbourne City',
            'location' => 'Melbourne',
            'lat' => '37.8136',
            'lng' => '144.9631'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne South',
            'location' => 'South Melbourne',
            'lat' => '37.8350',
            'lng' => '144.9600'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne East',
            'location' => 'East Melbourne',
            'lat' => '37.8130',
            'lng' => '144.9850'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne West',
            'location' => 'West Melbourne',
            'lat' => '37.8089',
            'lng' => '144.9291'
        ]);
    }
}
