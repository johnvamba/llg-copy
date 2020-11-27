<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\UserPortalScope;

trait UserPortalTrait
{
    public static function bootUserPortalTrait()
    {
        static::addGlobalScope(new UserPortalScope);
    }
}