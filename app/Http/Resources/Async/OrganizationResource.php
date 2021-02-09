<?php

namespace App\Http\Resources\Async;

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
            'label' => $this->name, //we show this.
            'value' => $this->id,
            'location' => $this->location,
            'address' => $this->address,
            'lat' => $this->lat,
            'lng' => $this->lng
        ];
    }
}
