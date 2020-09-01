<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceOffer extends Model
{
    //
    protected $guarded = [];

    /**
     * Create Offer Service
     * 
     * @return object
     */
    public static function createdServiceOffer($request, $id)
    {
        $serviceOffer = ServiceOffer::create(
            array_merge(
                request()->only([
                    'location',
                    'lat',
                    'lng',
                    'name'
                ]),
                [
                    'content_id' => $id,
                    'service_type_id' => $request->serviceType,
                ]
            )
        );

        return $serviceOffer;
    }
}
