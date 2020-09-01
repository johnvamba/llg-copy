<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NeedsMet extends Model
{
    //
    protected $guarded = [];

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
