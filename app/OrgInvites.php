<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class OrgInvites extends Model
{
    protected $guarded = [];

    protected static function boot() {
    	parent::boot();
		static::creating(function ($model){
			$model->token = Str::random(12);
		});
    }

    public function organization(){
    	return $this->belongsTo('App\Organization', 'org_id');
    }

    public static function scopeUnfilter($query) {
        return $query;
    }

    public function getNameAttribute() {
        return $this->first_name .' '. $this->last_name;
    }

    public function user() {
        return $this->belongsTo('App\User', 'email', 'email');
    }
}
