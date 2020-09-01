<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NeedsMet;
use Faker\Generator as Faker;

$factory->define(NeedsMet::class, function (Faker $faker) {
    return [
        'goal' => 100.00,
        'raised' => 50.00,
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude,
    ];
});
