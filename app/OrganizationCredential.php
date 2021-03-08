<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganizationCredential extends Model
{
    protected $guarded = [];

    public function organization()
    {
    	return $this->belongsTo(Organization::class, 'organization_id');
    }
}
