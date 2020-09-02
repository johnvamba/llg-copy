<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NeedsMetCategory;
use Faker\Generator as Faker;

$factory->define(NeedsMetCategory::class, function (Faker $faker) {
    return [
        'name' => $faker->text,
        'status' => true
    ];
});
