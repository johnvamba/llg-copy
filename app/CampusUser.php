<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CampusUser extends Model
{
    // public $incrementing = true;

    protected $guarded = [];

    public function campus(){
    	return $this->belongsTo(\App\Campus::class);
    }

    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }

}
