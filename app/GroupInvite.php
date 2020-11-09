<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupInvite extends Model
{
    //
    protected $guarded = [];

    public function group()
    {
        return $this->belongsTo('App\Group', 'group_id');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
