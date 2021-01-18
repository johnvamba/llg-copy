<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CampusResource extends JsonResource
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
            'name' => $this->name,
            'org_count' => $this->when(isset($this->organizations_count), $this->organizations_count),
            'team_count' =>$this->when(isset($this->users_count), $this->users_count),
            'description' => $this->description,
            'location' => $this->location,
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo')),
            'accessed' => $this->when($this->accessed, $this->accessed)
            //load others stuff here
        ];
    }
}
