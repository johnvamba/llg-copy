<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryCommentResource extends JsonResource
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
            'comment_id' => $this->id,
            'username' => $this->whenLoaded('user', fn() => optional($this->user)->name),
            'userphoto' => $this->whenLoaded('user_profile', fn() => optional($this->user_profile)->avatar),
            'is_hidden' => $this->hide ?? false,
            'comment' => $this->hide ? \Str::random(12) : $this->comment,
            'created_at' => $this->created_at->format('M j, Y g:i a'),
        ];
    }
}
