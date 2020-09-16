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
        $this->call(NeedsCategorySeeder::class);
        $this->call(NeedsTypeSeeder::class);
        $this->call(ServiceTypeSeeder::class);
        $this->call(UserSeeder::class);
    }
}
