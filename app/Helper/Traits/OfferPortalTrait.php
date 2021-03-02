<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\OfferPortalScope;

trait OfferPortalTrait
{
    public static function bootOfferPortalTrait()
    {
        static::addGlobalScope(new OfferPortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(OfferPortalScope::class);
    }
}