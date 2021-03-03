<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CampusUser extends Pivot
{
    // public $incrementing = true;
	protected $table = 'campus_users';
	
    protected $guarded = [];

    public function campus(){
    	return $this->belongsTo(\App\Campus::class);
    }

    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }

}
