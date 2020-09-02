<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Community;
use Faker\Generator as Faker;

$factory->define(Community::class, function (Faker $faker) {
    return [
        'name' => $this->faker->text,
        'description' => $this->faker->text,
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude
    ];
});
