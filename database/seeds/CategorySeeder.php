<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
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
        [ 'name' => 'Gardener', 'icon' => 'Gardener.png' ],
        [ 'name' => 'Other', 'icon' => 'Other.png' ],
    ];
    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Category::create(['name' => 'Housing', 'icon' => 'Housing.png']);
        \App\Category::create(['name' => 'Food', 'icon' => 'Food.png']);
        \App\Category::create(['name' => 'Everyday Things', 'icon' => 'Everyday.png']);
        \App\Category::create(['name' => 'Domestic & Family Violence', 'icon' => 'Violence.png']);
        \App\Category::create(['name' => 'Health', 'icon' => 'Health.png']);
        \App\Category::create(['name' => 'Mental Health', 'icon' => 'MentalHealth.png']);
        \App\Category::create(['name' => 'Education', 'icon' => 'Education.png']);
        \App\Category::create(['name' => 'Advocacy', 'icon' => 'Advocacy.png']);
        \App\Category::create(['name' => 'Children', 'icon' => 'Children.png']);
        \App\Category::create(['name' => 'Youth', 'icon' => 'Youth.png']);

        foreach ($this->volunteering as $key => $value) {
            \App\Category::firstOrCreate($value + ['type' => 'volunteer']);
        }
    }
}
