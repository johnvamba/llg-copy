<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Organization extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

    public function customerCredential()
    {
        return $this->morphMany('App\CustomerCredential', 'model');
    }

    public function activity()
    {
        return $this->morphMany('App\Activity', 'model');
    }

    public function categories()
    {
        return $this->morphMany('App\OrganizationHasCategory', 'model');
    }

    public function offers()
    {
        return $this->morphMany('App\ServiceOffer', 'model');
    }

    public function needs()
    {
        return $this->hasMany('App\Need');
    }
    
    public function categoriesList()
    {
        return $this->morphedByMany("App\OrganizationCategory", "model", 'organization_has_categories');
    }

    public function members()
    {
        return $this->morphedByMany("App\User", "model", 'organization_members');
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }
}
