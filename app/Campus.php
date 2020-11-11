<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    protected $guarded = [];

    public function organizations(){
    	return $this->hasManyThrough(\App\Organization::class, \App\CampusOrganizations::class);
    }

    public function users()
    {
    	return $this->hasManyThrough(\App\User::class, \App\CampusUser::class);
    }
}
