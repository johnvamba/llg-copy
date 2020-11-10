<?php

use Illuminate\Database\Seeder;

class NeedsCategorySeeder extends Seeder
{

    protected $volunteering = [
        [ 'name' => 'Employment', 'icon' => 'Employment.png' ],
        [ 'name' => 'Mechanic', 'icon' => 'Mechanic.png' ],
        [ 'name' => 'Cleaning', 'icon' => 'Cleaning.png' ],
        [ 'name' => 'Removalist', 'icon' => 'Removalist.png' ],
        [ 'name' => 'Tutor', 'icon' => 'Tutor.png' ],
        [ 'name' => 'Counselling', 'icon' => 'Counselling.png' ],
        [ 'name' => 'Legal Assistance', 'icon' => 'LegalAssistance.png' ],
        [ 'name' => 'Translation', 'icon' => 'Translation.png' ],
        [ 'name' => 'Handyman', 'icon' => 'Handyman.png' ],
        [ 'name' => 'Gardener', 'icon' => 'Gardener.png' ],
        [ 'name' => 'Driver', 'icon' => 'Driver.png' ],
        [ 'name' => 'Cook', 'icon' => 'Cook.png' ],
        [ 'name' => 'Hairdresser', 'icon' => 'Hairdresser.png' ],
        [ 'name' => 'Gardener', 'icon' => 'Gardener.png' ]
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Monetary
        \App\NeedsCategory::create(['name' => 'Housing', 'icon' => 'Housing.png']);
        \App\NeedsCategory::create(['name' => 'Food', 'icon' => 'Food.png']);
        \App\NeedsCategory::create(['name' => 'Everyday Things', 'icon' => 'Everyday.png']);
        \App\NeedsCategory::create(['name' => 'Domestic & Family Violence', 'icon' => 'Violence.png']);
        \App\NeedsCategory::create(['name' => 'Health', 'icon' => 'Health.png']);
        \App\NeedsCategory::create(['name' => 'Mental Health', 'icon' => 'MentalHealth.png']);
        \App\NeedsCategory::create(['name' => 'Education', 'icon' => 'Education.png']);
        \App\NeedsCategory::create(['name' => 'Advocacy', 'icon' => 'Advocacy.png']);
        \App\NeedsCategory::create(['name' => 'Children', 'icon' => 'Children.png']);
        \App\NeedsCategory::create(['name' => 'Youth', 'icon' => 'Youth.png']);

        foreach ($this->volunteering as $key => $value) {
            \App\NeedsCategory::firstOrCreate($value + ['type' => 'volunteer']);
        }
    }
}
