<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

class Need extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

    protected $appends = ['created'];

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
        return $this->categoriesList();
    }

    public function contribution()
    {
        return $this->hasOne('App\NeedMet', 'need_id');
    }
    
    public function organization()
    {
        return $this->belongsTo('App\Organization', 'organization_id');
    }

    public function type()
    {
        return $this->belongsTo('App\NeedsType', 'needs_type_id');
    }

    public function categoriesList()
    {
        return $this->morphToMany("App\Category", "categorize", 'categorizes');
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
