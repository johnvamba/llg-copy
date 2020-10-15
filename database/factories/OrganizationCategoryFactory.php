<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\OrganizationCategory;
use Faker\Generator as Faker;

$factory->define(OrganizationCategory::class, function (Faker $faker) {
    return [
        'name' => 'Health',
        'status' => true
    ];
});
