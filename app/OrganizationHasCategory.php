<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganizationHasCategory extends Model
{
    //

    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }

    public function category()
    {
        return $this->belongsTo('App\OrganizationCategory', 'organization_category_id');
    }
}
