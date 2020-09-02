<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Community extends Model implements HasMedia
{
    //
    use InteractsWithMedia;
    use SoftDeletes;
    
    protected $guarded = [];

    public function goals()
    {
        return $this->morphMany('App\Goal', 'model');
    }

    public function group()
    {
        return $this->hasOne('App\Group');
    }

    public function contents()
    {
        return $this->hasMany('App\CommunityContent');
    }
}
