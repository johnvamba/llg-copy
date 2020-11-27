<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\StoryPortalScope;

trait StoryPortalTrait
{
    public static function bootStoryPortalTrait()
    {
        static::addGlobalScope(new StoryPortalScope);
    }
}