<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ServiceOffer;
use Faker\Generator as Faker;

$factory->define(ServiceOffer::class, function (Faker $faker) {
    return [
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude,
    ];
});
