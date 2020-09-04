<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Organization;
use Faker\Generator as Faker;

$factory->define(Organization::class, function (Faker $faker) {
    return [
        'name' => $this->faker->text,
        'description' => $this->faker->text,
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude,
        'status' => true
    ];
});
