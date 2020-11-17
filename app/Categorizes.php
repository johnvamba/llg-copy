<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Categorizes extends Pivot
{
    public $incrementing = true; //Keep incrementing

    public function category()
    {
    	return $this->belongsTo(\App\Category::class);
    }
    //wild card relationship.
    public function categorize()
    {
    	return $this->morphTo();
    }
}
