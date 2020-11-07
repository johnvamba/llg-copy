<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->when($this->relationLoaded('serviceType'), optional($this->serviceType)->name),
            'location' => $this->location,
            'status' => $this->status,
            'ucstatus' => ucfirst($this->status),
            'photo' => $this->getFirstMediaUrl('photo'),
            'description' => $this->description,
            'date' => $this->created_at->format('m/d/Y')
        ];
        // return parent::toArray($request);
    }
}
