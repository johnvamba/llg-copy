<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

class GroupChat extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $guarded = [];

    protected $appends = ['created'];

    public function group()
    {
        return $this->belongsTo('App\Group', 'group_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
