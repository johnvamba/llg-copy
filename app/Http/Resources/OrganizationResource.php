<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationResource extends JsonResource
{
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
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo')),
            'banner' => $this->whenLoaded('media', $this->getFirstMediaUrl('banner')),
            'active_needs' => $this->when(!is_null($this->active_needs), $this->active_needs ?? 0),
            'past_needs' => $this->when(!is_null($this->past_needs), $this->past_needs ?? 0),
            'members_count' => $this->when(!is_null($this->members_count), $this->members_count ?? 0),
            'campus' => $this->when($this->relationLoaded('campus'), $this->morphCampus()),
            'category' => $this->whenLoaded('categories', optional($this->categories)->pluck('name')),
            'accessable' => $this->when($this->accessable, $this->accessable),
            'address' => $this->address
        ];
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
