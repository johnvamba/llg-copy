<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportUse extends Model
{
    protected $guarded = [];

    public function offer()
    {
        return $this->belongsTo(ServiceOffer::class, 'offer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function user_profile()
    {
        return $this->belongsTo('App\UserProfile', 'user_id', 'user_id');
    }
}
