<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\OrgPortalScope;

trait OrgPortalTrait
{
    public static function bootOrgPortalTrait()
    {
        static::addGlobalScope(new OrgPortalScope);
    }
}