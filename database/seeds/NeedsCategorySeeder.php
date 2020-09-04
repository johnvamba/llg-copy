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
        \App\NeedsCategory::create(['name' => 'Housing']);
        \App\NeedsCategory::create(['name' => 'Food']);
        \App\NeedsCategory::create(['name' => 'Everyday Things']);
        \App\NeedsCategory::create(['name' => 'Domestic & Family Violence']);
        \App\NeedsCategory::create(['name' => 'Health']);
        \App\NeedsCategory::create(['name' => 'Mental Health']);
        \App\NeedsCategory::create(['name' => 'Education']);
        \App\NeedsCategory::create(['name' => 'Advocacy']);
        \App\NeedsCategory::create(['name' => 'Children']);
        \App\NeedsCategory::create(['name' => 'Youth']);
    }
}
