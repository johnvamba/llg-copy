<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Group;
use Faker\Generator as Faker;

$factory->define(Group::class, function (Faker $faker) {
    $privacy = ['public', 'private'];
    return [
        'name' => $this->faker->words(2, true),
        'description' => $this->faker->text,
        'privacy' => $privacy[random_int(0,1)],
        'location' => $this->faker->address,
        'lat' => $this->faker->latitude,
        'lng' => $this->faker->longitude,
    ];
});
