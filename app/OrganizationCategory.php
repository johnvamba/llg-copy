<?php

namespace App;

use App\Category;

class OrganizationCategory extends Category
{
	public $table = 'categories';

	//Basically We override
	public static function boot(){
		parent::boot();

		static::addGlobalScope('type',function ($query) {
            $query->whereIn('categories.type', ['monetary']);
        });

        static::creating(function ($model){
			$model->type = 'monetary';
		});
	}
}

/*
	Old structure
use Illuminate\Database\Eloquent\Model;

class OrganizationCategory extends Model
{
    protected $guarded = [];
    
}
*/
