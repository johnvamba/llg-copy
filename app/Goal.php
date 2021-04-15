<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }

    public static function scopePending($query) 
    {
    	return $query->whereNotIn('status', ['achieved']);
    }
}
