<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    //
    use SoftDeletes;

    protected $guarded = [];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function needsMet()
    {
        return $this->hasOne('App\NeedsMet');
    }

    public function serviceOffer()
    {
        return $this->hasOne('App\ServiceOffer');
    }

    /**
     * Create a Content [needs, service or story]
     * @return object
     */
    public static function createContent($request)
    {
        $content = Content::create(
                array_merge(
                    request()->only([
                        'title',
                        'description',
                        'type',
                        'status'
                    ]),['user_id' => auth()->user()->id]
                )
            );

        return $content;
    }
}
