<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Need;
use App\NeedsType;
use Faker\Generator as Faker;

$factory->define(Need::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'description' => $faker->text,
        'location' => $faker->address,
        'lat' => $faker->latitude,
        'lng' => $faker->longitude,
        'raised' => rand(0, 100),
        'goal' => 100.00,
        'needs_type_id' => \optional(NeedsType::all()->random())->id,
    ];
});
