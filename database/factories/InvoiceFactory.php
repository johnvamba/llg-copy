<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Invoice;
use Faker\Generator as Faker;

$factory->define(Invoice::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat,
        'receipt' => $faker->uuid,
        'charge_id' => $faker->uuid,
        'description' => $faker->text
    ];
});
