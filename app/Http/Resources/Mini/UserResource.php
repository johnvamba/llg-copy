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
            'name' => $this->when($this->relationLoaded('profile'), optional($this->profile)->first_name . ' ' . optional($this->profile)->last_name, $this->name),
            'firstName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->firstname, $this),
            'lastName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->lastname, $this),
            'photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->avatar),
            'cover_photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->cover_photo),
            'invite_status' => $this->when(isset($this->invite_status), $this->invite_status)
            // 'contact' => '(00) 0000 000'
        ];
    }

}
