<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ServiceType;
use Faker\Generator as Faker;

$factory->define(ServiceType::class, function (Faker $faker) {
    $type = [
        'Employment',
        'Merchanic',
        'Cleaning',
        'Removalist',
        'Tutor',
        'Counselling',
        'Legal Assistance',
        'Translation',
        'Other'
    ];

    return [
        'name' => $type[random_int(0,8)],
        'status' => true
    ];
});
