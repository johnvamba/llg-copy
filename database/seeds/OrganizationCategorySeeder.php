<?php

use Illuminate\Database\Seeder;

class OrganizationCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\OrganizationCategory::create(['name' => 'Housing']);
        \App\OrganizationCategory::create(['name' => 'Food']);
        \App\OrganizationCategory::create(['name' => 'Everyday Things']);
        \App\OrganizationCategory::create(['name' => 'Domestic & Family Violence']);
        \App\OrganizationCategory::create(['name' => 'Health']);
        \App\OrganizationCategory::create(['name' => 'Mental Health']);
        \App\OrganizationCategory::create(['name' => 'Education']);
        \App\OrganizationCategory::create(['name' => 'Advocacy']);
        \App\OrganizationCategory::create(['name' => 'Children']);
        \App\OrganizationCategory::create(['name' => 'Youth']);
        \App\OrganizationCategory::create(['name' => 'Life Skills']);
    }
}
