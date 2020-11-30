<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Helper\Traits\OrgPortalTrait;

class Organization extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use OrgPortalTrait;

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
        return $this->morphToMany("App\Category", "categorize", 'categorizes');;
    }

    public function members()
    {
        return $this->morphedByMany("App\User", "model", 'organization_members');
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


    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }
}
