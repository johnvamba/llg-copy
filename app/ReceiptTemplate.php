<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ReceiptTemplate extends Model implements HasMedia
{
    use InteractsWithMedia;
    
	protected $guarded = [];

	public function organization()
	{
		return $this->belongsTo(\App\Organization::class);
	}

	public function registerMediaConversions(Media $media=null) : void
    {
        $this->addMediaConversion('listing')
            ->width(50)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('view')
            ->width(100)
            ->performOnCollections('photo')
            ->nonQueued();
    }
}
