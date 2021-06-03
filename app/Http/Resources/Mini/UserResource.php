<?php

namespace App\Http\Resources\Mini;

use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

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
            'firstName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->firstname),
            'lastName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->lastname),
            'photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->avatar),
            'cover_photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->cover_photo),
            'invite_status' => $this->when(isset($this->invite_status), $this->invite_status),
            'custom_date' => $this->when(isset($this->custom_date), Carbon::parse($this->custom_date)->format('m/d/y'))
            // 'contact' => '(00) 0000 000'
        ];
    }

}
