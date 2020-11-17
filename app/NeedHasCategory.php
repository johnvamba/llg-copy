<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
//Depreciate
class NeedHasCategory extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }
}
