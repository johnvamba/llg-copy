<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CampusOrganisation extends Pivot
{
	protected $table = 'campus_organisations';

	public $incrementing = true;
    protected $guarded = [];

	public function campus(){
		return $this->belongsTo(\App\Campus::class);
	}

	public function organization(){
		return $this->belongsTo(\App\Organization::class);
	}

}
