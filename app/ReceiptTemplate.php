<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ReceiptTemplate extends Model implements HasMedia
{
    use InteractsWithMedia;
    
	protected $guarded = [];

	public function organization()
	{
		return $this->belongsTo(\App\Organization::class);
	}
}
