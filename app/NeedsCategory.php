<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NeedsCategory extends Model
{
    //
    protected $guarded = [];

    public function category()
    {
        return $this->morphOne('App\NeedHasCategory', 'model');
    }
}
