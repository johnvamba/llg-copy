<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CampusOrganisation extends Pivot
{
	public $incrementing = true;

	public function campus(){
		return $this->belongsTo(\App\Campus::class);
	}

	public function organization(){
		return $this->belongsTo(\App\Organization::class);
	}

}
