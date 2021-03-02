<?php

namespace App\Http\Resources\Mini;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
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
            'avatar' => $this->when($this->relationLoaded('user'), optional($this->user->profile)->avatar ?? 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'),
            'title' =>$this->when($this->relationLoaded('user'), optional($this->user)->name),
            'description' => $this->description,
            'short_description' => $this->short_description,
            'created' => $this->created
        ];
    }
}
