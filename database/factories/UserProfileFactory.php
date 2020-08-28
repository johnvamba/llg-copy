<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\UserProfile;
use Faker\Generator as Faker;

$factory->define(UserProfile::class, function (Faker $faker) {
    return [
        'age' => 18,
        'location' => $faker->address,
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
        'bio' => $faker->text
    ];
});
