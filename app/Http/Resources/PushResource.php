<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PushResource extends JsonResource
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
            'message' => $this->message,
            'schedule_date' => optional($this->scheduled_at)->format('m/d/Y'),
            'schedule_time' => optional($this->scheduled_at)->format('h:i A'),
            'status' => $this->status
        ];
    }
}
