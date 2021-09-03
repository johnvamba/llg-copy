<?php

namespace App;

use App\Helper\Traits\UserPortalTrait;

class ScopedUser extends User
{
    use UserPortalTrait;

    protected $table = 'users';
}
