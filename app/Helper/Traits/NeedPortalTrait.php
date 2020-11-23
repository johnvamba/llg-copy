<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\NeedPortalScope;

trait NeedPortalTrait
{
    public static function bootNeedPortalTrait()
    {
        static::addGlobalScope(new NeedPortalScope);
    }
}