<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Organization extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

    protected $with = ['needs'];

    public function customerCredential()
    {
        return $this->morphOne('App\CustomerCredential', 'model');
    }

    public function needs()
    {
        return $this->morphMany('App\Need', 'model');
    }
}
