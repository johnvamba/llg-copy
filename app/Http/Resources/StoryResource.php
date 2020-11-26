<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'categories' => $this->whenLoaded('categories', optional($this->categories)->pluck('name')),
            'comments_count' => $this->when(isset($this->comments_count), $this->comments_count, 0),
            'org_photo' => '',
            'photo' => '',
            'shares_count' => 0,
            'appreciates_count' => $this->when(isset($this->appreciates_count), $this->appreciates_count, 0),
            'date_numb' => optional($this->posted_at)->format('m/d/y'),
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo')),
            'date' => optional($this->posted_at)->format('M j, Y'),
            'released_at' => $this->posted_at,
        ];
        // return parent::toArray($request);
    }
}
