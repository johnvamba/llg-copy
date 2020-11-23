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
            'lng' => '144.9631',
            'cover_photo' => 'MelbourneCity.png'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne South',
            'location' => 'South Melbourne',
            'lat' => '37.8350',
            'lng' => '144.9600',
            'cover_photo' => 'MelbourneSouth.png'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne East',
            'location' => 'East Melbourne',
            'lat' => '37.8130',
            'lng' => '144.9850',
            'cover_photo' => 'MelbourneEast.png'
        ]);
        
        \App\Campus::create([
            'name' => 'Melbourne West',
            'location' => 'West Melbourne',
            'lat' => '37.8089',
            'lng' => '144.9291',
            'cover_photo' => 'MelbourneWest.png'
        ]);
    }
}
