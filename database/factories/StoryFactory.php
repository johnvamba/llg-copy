<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Story;
use Faker\Generator as Faker;

$factory->define(Story::class, function (Faker $faker) {
    $date = \Carbon\Carbon::now();

    return [
        'title' => $this->faker->text,
        'description' => $this->faker->text,
        'featured_start_date' => $date->toDateString(),
        'featured_end_date' => $date->addDays(5)->toDateString()
    ];
});
