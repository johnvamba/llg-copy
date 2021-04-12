<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Async\CampusResource;

class OrganizationResource extends JsonResource
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
            'id'    => $this->id, //We need only this.
            'name'  => $this->name,
            'description' => $this->description,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'location' => $this->location,
            'site' => $this->site,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'benevity_link' => $this->benevity_link,
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo', self::$convert)),
            'banner' => $this->whenLoaded('media', $this->getFirstMediaUrl('banner', self::$convert)),
            'active_needs' => $this->when(!is_null($this->active_needs), $this->active_needs ?? 0),
            'past_needs' => $this->when(!is_null($this->past_needs), $this->past_needs ?? 0),
            'members_count' => $this->when(!is_null($this->members_count), $this->members_count ?? 0),
            'campus' => $this->when($this->relationLoaded('campus'), $this->morphCampus()),
            'campuses' => CampusResource::collection($this->whenLoaded('campuses')),
            'category' => $this->whenLoaded('categories', optional($this->categories)->pluck('name')),
            'accessable' => $this->when($this->accessable, $this->accessable),
            'date_added' => optional($this->created_at)->format('m/d/Y'),
            'address' => $this->address,
            'details' => [
                'acnc' => $this->acnc ?? false, 
                'fundraiser' => $this->fundraiser ?? false, 
                'insured' => $this->insured ?? false,
                'taxable' => $this->taxable ?? false,
                'benevity' => !is_null($this->benevity_link) ?? false,
                'stripe' => $this->whenLoaded('credential', $this->cred(), false)
            ]
        ];
    }

    protected function cred() {
        return isset($this->credential->secret_key) && isset($this->credential->publishable_key);
    }

    protected function morphCampus(){
        if(isset($this->campus))
            return [
                'id' => optional($this->campus)->id,
                'value' => optional($this->campus)->id,
                'label' => optional($this->campus)->name,
            ];
    }
}
