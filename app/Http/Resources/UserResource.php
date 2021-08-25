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
        return [
            'id' => $this->id,
            'title' => $this->name,//$this->when($profile, optional($profile)->firstname . ' '. optional($profile)->lastname, $this->name),
            'email' => $this->email,
            'status' => ucfirst($this->status),
            'date' => $this->created_at->format('m/d/Y'),
            //profile
            'firstName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->first_name),
            'lastName' => $this->when($this->relationLoaded('profile'), optional($this->profile)->last_name),
            'photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->avatar),
            'cover_photo' => $this->when($this->relationLoaded('profile'), optional($this->profile)->cover_photo),
            'age' => $this->when($this->relationLoaded('profile'), optional($this->profile)->age, 18),
            'bio' => $this->when($this->relationLoaded('profile'), optional($this->profile)->bio),

            'location' => $this->when($this->relationLoaded('profile'), optional($this->profile)->location),                
            'lng' => $this->when($this->relationLoaded('profile'), optional($this->profile)->lng),
            'lat' => $this->when($this->relationLoaded('profile'), optional($this->profile)->lat),

            'type' => $this->when($this->relationLoaded('roles'), optional($this->getRoleNames())->first()),
            'organization' => $this->when($this->relationLoaded('organization'), $this->parseOrg()),
            'campus' => $this->when($this->relationLoaded('campus'), $this->parseCamp()),
            'mobile_number' => $this->when(isset($this->mobile_number), $this->mobile_number),
        ];
    }

    protected function parseOrg()
    {
        if(!$org = $this->organization)
            return null;

        return [
            'id' => $org->id,
            'value' => $org->id,
            'label' => $org->name,
            'name'  => $org->name
        ];
    }

    protected function parseCamp()
    {
        if(!$org = $this->campus)
            return null;

        return [
            'id' => $org->id,
            'value' => $org->id,
            'label' => $org->name,
            'name'  => $org->name
        ];
    }
}
