<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PushNotification extends Model
{
    protected $guarded = [];

    protected $dates = ['scheduled_at'];

    public function notifications(){
    	return $this->hasMany(Notification::class, 'push_id');
    }
}
