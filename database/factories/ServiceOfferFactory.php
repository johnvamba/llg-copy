<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ServiceOffer;
use Faker\Generator as Faker;

$factory->define(ServiceOffer::class, function (Faker $faker) {
    return [
        'title' => $this->faker->text,
        'description' => $this->faker->text,
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude,
        'business_name' => ucfirst($faker->words(2, true)),
        'business_contact' => ucfirst($faker->words(2, true))
    ];
});
