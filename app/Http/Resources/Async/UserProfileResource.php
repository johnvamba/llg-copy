<?php

namespace App\Http\Resources\Async;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

class UserProfileResource extends JsonResource
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
            'photo' => $this->avatar,
            'cover_photo' => $this->cover_photo,
            'email' => $this->when($this->relationLoaded('user'), 
                fn() => optional($this->user)->email, 
                isset($this->email) ? $this->email : new MissingValue
            ),
            'name' => $this->first_name. ' '. $this->last_name
        ];
    }
}
