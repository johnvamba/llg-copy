<?php

use Illuminate\Database\Seeder;

class NeedsCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
    }
}
