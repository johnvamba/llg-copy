<?php

namespace App;

use App\Category;

class NeedsCategory extends Category
{
	protected $table = 'categories';

	//Basically We override
	public static function boot(){
		parent::boot();

		static::addGlobalScope('type',function ($query) {
            $query->whereIn('categories.type', ['monetary','volunteer']);
        });

        static::creating(function ($model){
			$model->type = 'monetary';
		});
	}
}


/*
	//Old Structure
	use Illuminate\Database\Eloquent\Model;

	class NeedsCategory extends Model
	{
	    //
	    protected $guarded = [];

	    public function category()
	    {
	        return $this->morphOne('App\NeedHasCategory', 'model');
	    }
	}
*/
