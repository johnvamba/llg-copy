<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CampusOrganisation extends Model
{
	// public $incrementing = true;

	public function campus(){
		return $this->belongsTo(\App\Campus::class);
	}

	public function organization(){
		return $this->belongsTo(\App\Organization::class);
	}

}
