<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Need extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    protected $guarded = [];

    protected $with = ['tags'];

    public function model()
    {
        return $this->morphTo();
    }

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function invoices()
    {
        return $this->morphMany('App\Invoice', 'model');
    }

    public function activity()
    {
        return $this->morphMany('App\Activity', 'model');
    }

    public function category()
    {
        return $this->belongsTo('App\NeedsCategory', 'needs_category_id');
    }

    public function type()
    {
        return $this->belongsTo('App\NeedsType', 'needs_type_id');
    }
}
