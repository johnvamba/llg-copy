<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\CampusPortalScope;

trait CampusPortalTrait
{
    public static function bootCampusPortalTrait()
    {
        static::addGlobalScope(new CampusPortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(CampusPortalScope::class);
    }
}