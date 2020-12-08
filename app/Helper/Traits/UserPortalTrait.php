<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\UserPortalScope;

trait UserPortalTrait
{
    public static function bootUserPortalTrait()
    {
        static::addGlobalScope(new UserPortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(UserPortalScope::class);
    }
}