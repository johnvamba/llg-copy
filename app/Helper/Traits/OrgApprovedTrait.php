<?php

namespace App\Helper\Traits;

use App\Helper\Scopes\OrgApprovedScope;

trait OrgApprovedTrait
{
    // public static function bootOrgApprovedTrait()
    // {
    //     static::addGlobalScope(new OrgApprovedScope);
    // }

    // public static function scopeUnfilterApprove($query) {
    // 	return $query->withoutGlobalScope(OrgApprovedScope::class);
    // }

    public static function scopeApproved($query) {
    	return $query->whereNotNull('approved_at');
    }

    public static function scopePending($query) {
    	return $query->whereNull('approved_at');
    }
}