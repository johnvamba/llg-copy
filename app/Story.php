<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Story extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

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

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }
}
