<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\GroupPortalScope;

trait GroupPortalTrait
{
    public static function bootGroupPortalTrait()
    {
        static::addGlobalScope(new GroupPortalScope);
    }
}