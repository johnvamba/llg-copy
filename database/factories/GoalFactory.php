<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Goal;
use Faker\Generator as Faker;

$factory->define(Goal::class, function (Faker $faker) {
    $term = ['month', 'year'];

    return [
        'term' => $term[random_int(0,1)],
        'need' => random_int(1, 20)
    ];
});
