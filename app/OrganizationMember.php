<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganizationMember extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public function model()
    {
        return $this->morphTo();
    }
}
