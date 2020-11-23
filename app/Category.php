<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $guarded = [];

	public function needs()
    {
    	return $this->morphedByMany(\App\Need::class, 'categorized');
    }

    public function organizations()
    {
    	return $this->morphedByMany(\App\Organization::class, 'categorized');
    }

    public function stories()
    {
    	return $this->morphedByMany(\App\Story::class, 'categorized');
    }

    public function service_offers()
    {
    	return $this->hasMany(\App\ServiceOffer::class, 'service_type_id');
    }
}
/*
	//Direction
	To Query
		Needs
		Category::whereHas('needs', fn($need)=>$need->find($need_id))->get();

		Organizations
		Category::whereHas('organizations', fn($org)=>$org->find($org_id))->get();

		and so on..
*/