<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NeedsType;
use Faker\Generator as Faker;

$factory->define(NeedsType::class, function (Faker $faker) {
    return [
        'name' => 'Fundraise',
        'status' => true
    ];
});
