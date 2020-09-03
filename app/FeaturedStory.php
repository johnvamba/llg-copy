<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeaturedStory extends Model
{
    //
    protected $guarded = [];

    public function contents()
    {
        return $this->belongsTo('App\Content', 'content_id');
    }
}
