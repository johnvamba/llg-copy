<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\NeedsCategory;

class UserProfile extends Model
{
    protected $guarded = [];

    protected $hidden = ['photo'];

    /**
     * Create user profile
     * @return object
     */
    public static function createProfile($request, $id)
    {
        $preference = $request->preference ?: 
            NeedsCategory::pluck('name');

        $profile = UserProfile::create(
                array_merge(
                    $request->only(
                        'age',
                        'bio',
                        'location',
                        'lat',
                        'lng'
                    ), [
                        'user_id' => $id,
                        'first_name' => $request->firstName,
                        'last_name' => $request->lastName
                    ]
                )
            );

        return $profile;
    }

    /**
     * Upload user photo
     * @return object
     */
    public static function uploadPhoto($url, $id)
    {
        $profile = UserProfile::where('user_id', $id)->first();
        $profile->avatar = $url;
        $profile->save();

        return $profile;
    }
}
