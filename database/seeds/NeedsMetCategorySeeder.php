<?php

use Illuminate\Database\Seeder;
use App\NeedsMetCategory;

class NeedsMetCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        NeedsMetCategory::create(['name' => 'Housing']);
        NeedsMetCategory::create(['name' => 'Food']);
        NeedsMetCategory::create(['name' => 'Everyday Things']);
        NeedsMetCategory::create(['name' => 'Domestic & Family Violence']);
        NeedsMetCategory::create(['name' => 'Health']);
        NeedsMetCategory::create(['name' => 'Mental Health']);
        NeedsMetCategory::create(['name' => 'Education']);
        NeedsMetCategory::create(['name' => 'Advocacy']);
        NeedsMetCategory::create(['name' => 'Children']);
        NeedsMetCategory::create(['name' => 'Youth']);
    }
}
