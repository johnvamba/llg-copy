<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        
        $this->call(RoleSeeder::class);
        $this->call(CampusSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(OrganizationCategorySeeder::class); //As CategorySeeder
        $this->call(NeedsCategorySeeder::class); //As CategorySeeder
        $this->call(NeedsTypeSeeder::class);
        $this->call(ServiceTypeSeeder::class); //As CategorySeeder
        $this->call(UserSeeder::class);
    }
}
