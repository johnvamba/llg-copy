<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NeedsMet extends Model
{
    //
    protected $guarded = [];

    public function content()
    {
        return $this->belongsTo('App\Content', 'content_id');
    }

    public function category()
    {
        return $this->belongsTo('App\NeedsMetCategory', 'needs_met_category_id');
    }

    public function type()
    {
        return $this->belongsTo('App\NeedsMetType', 'needs_met_type_id');
    }

    /**
     * Create Needs Met
     * @return object
     */
    public static function createNeedsMet($request, $id)
    {
        $needsMet = NeedsMet::create(
                array_merge(
                    request()->only([
                        'location',
                        'lat',
                        'lng',
                        'raised',
                        'goal'
                    ]),
                    [
                        'content_id' => $id,
                        'needs_met_category_id' => $request->needsCategory,
                        'needs_met_type_id' => $request->needsType,
                    ]
                )
            );

        return $needsMet;
    }
}
