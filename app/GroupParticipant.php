<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupParticipant extends Model
{
    //
    use SoftDeletes;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
