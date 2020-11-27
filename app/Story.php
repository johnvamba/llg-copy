<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

use App\Helper\Traits\StoryPortalTrait;

class Story extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use StoryPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    protected $dates = ['posted_at'];
    
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

    public function campus()
    {
        return $this->belongsTo(Campus::class, CampusOrganization::class, 'organization_id', 'campus_id', 'organization_id', 'campus_id');
    }

    public function appreciates()
    {
        return $this->hasMany('App\StoryAppreciate');
    }
    
    public function comments()
    {
        return $this->hasMany('App\CommentStory');
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
