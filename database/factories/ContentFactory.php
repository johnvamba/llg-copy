<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Content;
use Faker\Generator as Faker;

$factory->define(Content::class, function (Faker $faker) {
    return [
        'title' => $this->faker->text,
        'description' => $this->faker->text,
        'status' => 'pending'
    ];
});
