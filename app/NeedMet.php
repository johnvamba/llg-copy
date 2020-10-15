<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NeedMet extends Model
{
    //
    protected $guarded = [];

    public function need()
    {
        return $this->belongsTo('App\Need');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
