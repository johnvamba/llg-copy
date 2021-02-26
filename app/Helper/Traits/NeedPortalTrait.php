<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\NeedPortalScope;

trait NeedPortalTrait
{
    public static function bootNeedPortalTrait()
    {
        static::addGlobalScope(new NeedPortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(NeedPortalScope::class);
    }
}