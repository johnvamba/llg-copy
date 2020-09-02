<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunityContent extends Model
{
    //
    protected $guarded = [];

    public function details()
    {
        return $this->belongsTo('App\Content', 'content_id');
    }
}
