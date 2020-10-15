<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NeedHasCategory extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }
}
