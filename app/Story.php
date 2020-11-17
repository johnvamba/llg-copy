<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

class Story extends Model implements HasMedia
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

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }

    public function appreciates()
    {
        return $this->hasMany('App\StoryAppreciate');
    }
    //Categories
    public function categories()
    {
        return $this->morphToMany("App\Category", "categorize", 'categorizes');;
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
