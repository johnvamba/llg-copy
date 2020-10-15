<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NeedsCategory;
use Faker\Generator as Faker;

$factory->define(NeedsCategory::class, function (Faker $faker) {
    return [
        'name' => 'Health',
        'icon' => 'Housing.png',
        'status' => true
    ];
});
