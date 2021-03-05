<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\InvoicePortalScope;

trait InvoicePortalTrait
{
    public static function bootInvoicePortalTrait()
    {
        static::addGlobalScope(new InvoicePortalScope);
    }

    public static function scopeUnfilter($query){
    	return $query->withoutGlobalScope(InvoicePortalScope::class);
    }
}