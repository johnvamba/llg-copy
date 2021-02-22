<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupLocation extends Model
{
    protected $guarded = [];

    public function group()
    {
    	return $this->belongsTo('App\Group');
    }

    public function location()
    {
    	return $this->morphTo();
    }
}
