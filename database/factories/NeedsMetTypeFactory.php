<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NeedsMetType;
use Faker\Generator as Faker;

$factory->define(NeedsMetType::class, function (Faker $faker) {
    return [
        'name' => 'Fundraise',
        'status' => true
    ];
});
