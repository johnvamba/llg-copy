<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Activity extends Model
{
    protected $guarded = [];

    protected $appends = ['created'];

    public function model()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
