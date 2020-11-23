<?php

namespace App;

class ServiceType extends Category
{
	public $table = 'categories';

	//Basically We override
	public static function boot(){
		parent::boot();

		static::addGlobalScope('type',function ($query) {
            $query->whereIn('categories.type', ['volunteer']);
        });

        static::creating(function ($model){
			$model->type = 'volunteer';
		});
	}
}

/*Old structure
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    //
    protected $guarded = [];
}
*/
