<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerCredential extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }
}
