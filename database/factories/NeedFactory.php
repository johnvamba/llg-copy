<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Need;
use Faker\Generator as Faker;

$factory->define(Need::class, function (Faker $faker) {
    return [
        'title' => $faker->text,
        'description' => $faker->text,
        'location' => $faker->address,
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
        'raised' => 50.00,
        'goal' => 100.00
    ];
});
