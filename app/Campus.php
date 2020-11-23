<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    protected $guarded = [];

    public function organizations(){
    	return $this->hasManyThrough(\App\Organization::class, \App\CampusOrganisation::class,
    		'campus_id',
    		'id',
    		'id',
    		'organization_id'
    	);
    }

    public function users()
    {
    	return $this->hasManyThrough(\App\User::class, \App\CampusUser::class);
    }

    public function needs() {
        return $this->hasManyThrough(\App\Need::class, \App\CampusOrganisation::class, 'campus_id', 'organization_id', 'id', 'organization_id');
    }
}
