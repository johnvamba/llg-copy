<?php

use Illuminate\Database\Seeder;
use App\User;
use App\UserProfile;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        
        $admin = User::firstOrCreate([
                'name' => 'admin user',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password'),
            ]);
        
        $admin->assignRole('admin');
        
        UserProfile::create([
            'user_id' => $admin->id,
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'age' => 20,
            'location' => $faker->address,
            'lat' => $faker->latitude,
            'lng' => $faker->longitude,
            'bio' => $faker->text,
        ]);

        // $org = User::firstOrCreate([
        //     'name' => 'organization admin',
        //     'email' => 'organ@gmail.com',
        //     'password' => bcrypt('password'),
        // ]);
        
        // $org->assignRole('organization admin');
        
        // UserProfile::create([
        //     'user_id' => $org->id,
        //     'first_name' => $faker->firstName,
        //     'last_name' => $faker->lastName,
        //     'age' => 20,
        //     'location' => $faker->address,
        //     'lat' => $faker->latitude,
        //     'lng' => $faker->longitude,
        //     'bio' => $faker->text,
        // ]);
    }
}
