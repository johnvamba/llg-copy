<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    static $convert = '';

    public static function setConversion($convert = ''){
        self::$convert = $convert;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->when($this->relationLoaded('serviceType'), optional($this->serviceType)->name),
            'status' => $this->status,
            'ucstatus' => ucfirst($this->status),
            'photo' => $this->getFirstMediaUrl('photo', self::$convert),
            'description' => $this->description,
            'date' => $this->created_at->format('m/d/Y'),
            'location' => $this->location,
            'lat' => (float) $this->lat,
            'lng' => (float) $this->lng,
            'address' => $this->address,
            'business_name' => $this->business_name,
            'business_site' => $this->business_site,
            'business_contact' => $this->business_contact,
            'report_count' => $this->when(isset($this->reports_count), $this->reports_count)
        ];
        // return parent::toArray($request);
    }
}
