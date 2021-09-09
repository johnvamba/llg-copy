<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\NeedMetPortalScope;

trait NeedMetPortalTrait
{
    public static function bootNeedMetPortalTrait()
    {
        static::addGlobalScope(new NeedMetPortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(NeedMetPortalScope::class);
    }
}