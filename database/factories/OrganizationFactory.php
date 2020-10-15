<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Organization;
use Faker\Generator as Faker;

$factory->define(Organization::class, function (Faker $faker) {
    return [
        'name' => $faker->text,
        'email' => $faker->email,
        'phone_number' => $faker->phoneNumber,
        'site' => $faker->url,
        'description' => $faker->text,
        'location' => $faker->address,
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
        'status' => true
    ];
});
