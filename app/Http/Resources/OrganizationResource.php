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
            // 'cover' => $this->
            'active_needs' => $this->when(!is_null($this->active_needs), $this->active_needs ?? 0),
            'past_needs' => $this->when(!is_null($this->past_needs), $this->past_needs ?? 0),
            'members_count' => $this->when(!is_null($this->members_count), $this->members_count ?? 0),
        ];
    }
}
