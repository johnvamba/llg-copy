<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\FeaturedStory;
use Faker\Generator as Faker;

$factory->define(FeaturedStory::class, function (Faker $faker) {
    $date = \Carbon\Carbon::now();

    return [
        'start_date' => $date->toDateString(),
        'end_date' => $date->addDays(5)->toDateString(),
    ];
});
