<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Organization;

class ReceiptTemplateResource extends JsonResource
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
            'subject' => $this->subject,
            'html_content' => $this->html_content,
            'raw_draft_json' => $this->raw_draft_json,
            'org_name' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->name ),
            'org_location' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->location ),
            'facebook' => $this->facebook, 
            'twitter' => $this->twitter, 
            'instagram' => $this->instagram, 
            'text' => $this->text,
            'photo' => $this->when($this->relationLoaded('media') || $this->relationLoaded('organization'), fn() => $this->getFirstMediaUrl('photo') ? $this->getFirstMediaUrl('photo') : optional($this->organization)->getFirstMediaUrl('photo'))
        ];
    }
}
