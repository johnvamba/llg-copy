<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Helper\Traits\OrgPortalTrait;
use App\Helper\Traits\OrgApprovedTrait;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Organization extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use OrgPortalTrait, OrgApprovedTrait;

    protected $guarded = [];

    public function customerCredential()
    {
        return $this->morphMany('App\CustomerCredential', 'model');
    }

    public function credential()
    {
        return $this->hasOne('App\OrganizationCredential');
    }

    public function activity()
    {
        return $this->morphMany('App\Activity', 'model');
    }

    public function categories()
    {
        return $this->categoriesList();
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
        return $this->morphToMany("App\Category", "categorize", 'categorizes');
    }

    public function members()
    {
        return $this->morphedByMany("App\ScopedUser", "model", 'organization_members');
    }

    public function template()
    {
        return $this->hasOne(\App\ReceiptTemplate::class, 'organization_id');
    }

    public function campus(){
        return $this->hasOneThrough(\App\Campus::class, \App\CampusOrganisation::class,
            'organization_id',
            'id',
            'id',
            'campus_id'
        );
    }

    public function campuses(){
        return $this->hasManyThrough(\App\Campus::class, \App\CampusOrganisation::class,
            'organization_id',
            'id',
            'id',
            'campus_id'
        );
    }


    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }

    public function registerMediaConversions(Media $media=null) : void
    {
        $this->addMediaConversion('listing')
            ->width(50)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('listing')
            ->width(380)
            ->performOnCollections('banner')
            ->nonQueued();

        $this->addMediaConversion('view')
            ->width(100)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('view')
            ->width(610)
            ->performOnCollections('banner')
            ->nonQueued();
    }
}
