<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ServiceOffer extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

    protected $with = ['tags'];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function serviceType()
    {
        return $this->belongsTo('App\ServiceType');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }
}
