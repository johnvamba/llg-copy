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
        \App\Category::firstOrCreate(['name' => 'Housing', 'icon' => 'Housing.png']);
        \App\Category::firstOrCreate(['name' => 'Food', 'icon' => 'Food.png']);
        \App\Category::firstOrCreate(['name' => 'Everyday Things', 'icon' => 'Everyday.png']);
        \App\Category::firstOrCreate(['name' => 'Domestic & Family Violence', 'icon' => 'Violence.png']);
        \App\Category::firstOrCreate(['name' => 'Health', 'icon' => 'Health.png']);
        \App\Category::firstOrCreate(['name' => 'Mental Health', 'icon' => 'MentalHealth.png']);
        \App\Category::firstOrCreate(['name' => 'Education', 'icon' => 'Education.png']);
        \App\Category::firstOrCreate(['name' => 'Advocacy', 'icon' => 'Advocacy.png']);
        \App\Category::firstOrCreate(['name' => 'Children', 'icon' => 'Children.png']);
        \App\Category::firstOrCreate(['name' => 'Youth', 'icon' => 'Youth.png']);

        foreach ($this->volunteering as $key => $value) {
            \App\Category::firstOrCreate($value + ['type' => 'volunteer']);
        }
    }
}
