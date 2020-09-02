<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use SoftDeletes;
    
    protected $guarded = [];

    public function participants()
    {
        return $this->hasMany('App\GroupParticipant');
    }
}
