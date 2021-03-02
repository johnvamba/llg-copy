<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

use App\Helper\Traits\NeedPortalTrait;

class Need extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use NeedPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    protected $dates = ['scheduled_at'];

    protected $with = ['tags'];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function invoices()
    {
        return $this->morphMany('App\Invoice', 'model');
    }

    public function activity()
    {
        return $this->morphMany('App\Activity', 'model');
    }

    public function categories()
    {
        //
        return $this->morphToMany("App\Category", "categorize", 'categorizes');
    }

    public function contribution()
    {
        return $this->hasOne('App\NeedMet', 'need_id');
    }
    
    public function contributors()
    {
        return $this->morphedByMany('App\User', 'model', 'need_mets');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization', 'organization_id');
    }

    public function campus()
    {
        return $this->hasOneThrough(Campus::class, 
            CampusOrganisation::class, 
            'organization_id', 
            'id', 'organization_id', 'campus_id');
    }

    public function type()
    {
        return $this->belongsTo('App\NeedsType', 'needs_type_id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }
}
