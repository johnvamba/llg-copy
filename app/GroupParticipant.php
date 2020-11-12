<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class GroupParticipant extends Model
{
    protected $guarded = [];

    protected $appends = ['created'];

    public function group()
    {
        return $this->belongsTo('App\Group', 'group_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
