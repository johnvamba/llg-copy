<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\GroupChat;
use Faker\Generator as Faker;

$factory->define(GroupChat::class, function (Faker $faker) {
    return [
        'message' => $faker->text
    ];
});
