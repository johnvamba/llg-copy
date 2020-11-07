<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\UserProfile;

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
        $profile = $this->relationLoaded('profile', $this->profile, new UserProfile);

        return [
            'id' => $this->id,
            'title' => $this->name,//$this->when($profile, optional($profile)->firstname . ' '. optional($profile)->lastname, $this->name),
            'email' => $this->email,
            'status' => ucfirst($this->status),
            'photo' => $this->when($profile, optional($profile)->getFirstMediaUrl('photo')),
            'age' => $this->when($profile, optional($profile)->age, 18),
            'bio' => $this->when($profile, optional($profile)->bio),
            'date' => $this->created_at->format('m/d/Y')
        ];
    }

}
