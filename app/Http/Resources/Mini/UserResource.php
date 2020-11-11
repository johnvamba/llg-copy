<?php

namespace App\Http\Resources\Mini;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'name' => $this->when($this->relationLoaded('profile'), optional($this->profile)->firstname . ' ' . optional($this->profile)->lastname, $this->name),
            'firstName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->firstname, $this),
            'lastName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->lastname, $this),
            'photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->avatar),
            'cover_photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->cover_photo),
            'contact' => '(00) 0000 000'
        ];
    }

}
