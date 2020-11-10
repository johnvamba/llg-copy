<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class NeedMet extends Model
{
    //
    protected $guarded = [];

    protected $appends = ['created'];

    public function model()
    {
        return $this->morphTo();
    }

    public function need()
    {
        return $this->belongsTo('App\Need', 'need_id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
