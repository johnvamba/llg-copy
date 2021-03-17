<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
//use App\Helper\Traits\GroupPortalTrait;

class Group extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    //use GroupPortalTrait;

    protected $guarded = [];

    protected $with = ['tags'];

    public function goals()
    {
        return $this->morphMany('App\Goal', 'model');
    }

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function campus()
    {
        return $this->morphedByMany('App\Campus', 'location', 'group_locations');
    }

    public function groupLocation()
    {
        return $this->hasMany('App\GroupLocation');
    }

    public function participants()
    {
        return $this->hasMany('App\GroupParticipant');
    }

    public function participant_users()
    {
        return $this->hasManyThrough('App\User', 'App\GroupParticipant', 'group_id', 'id', 'id', 'user_id');
    }
    
    public function requesting()
    {
        return $this->hasMany('App\GroupParticipant');
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }

    /*
        //Magic queries
    */
    public static function scopeWithGoalRatio($query)
    {
        return $query->withCount(['goals as goals_acheived'=>function($goalQuery) {
            $goalQuery->where('status', 'acheived');
        }, 'goals']);
    }
}
