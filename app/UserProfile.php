<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $guarded = [];

    public static function createProfile($request, $id)
    {
        $profile = UserProfile::create(
                $request->only(
                    'age',
                    'bio',
                    'location',
                    'lat',
                    'lng',
                    'photo',
                    'amount_given'
                )
            );

        return $profile;
    }
}
