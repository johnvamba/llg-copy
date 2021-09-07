<?php

namespace App;

use App\Helper\Traits\UserPortalTrait;

class ScopedUser extends User
{
    use UserPortalTrait;

    protected $table = 'users';

    public function profile()
    {
        return $this->hasOne('App\UserProfile', 'user_id');
    }
}
