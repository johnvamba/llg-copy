<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CampusUser extends Pivot
{
    protected $incrementing = true;

    public function campus(){
    	return $this->belongsTo(\App\Campus::class);
    }

    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }

}
