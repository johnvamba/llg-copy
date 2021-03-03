<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

use App\Helper\Traits\CampusPortalTrait;

class Campus extends Model implements HasMedia
{
    use InteractsWithMedia;
    use CampusPortalTrait;

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
    	return $this->hasManyThrough(\App\User::class, \App\CampusUser::class, 'campus_id', 'id', 'id', 'user_id');
    }

    public function needs() {
        return $this->hasManyThrough(\App\Need::class, \App\CampusOrganisation::class, 'campus_id', 'organization_id', 'id', 'organization_id');
    }

    public function groups()
    {
        return $this->morphedByMany('App\Group', 'location', 'group_locations');
    }
}
