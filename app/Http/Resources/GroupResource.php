<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Async\CampusResource;

class GroupResource extends JsonResource
{
    static $convert = '';

    public static function setConversion($convert = ''){
        self::$convert = $convert;
        // return self;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $achieved = $this->goals_achieved ?? 0;
        $goals = $this->goals_count;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'participants_count' => $this->when(isset($this->participants_count), $this->participants_count),
            'short_description' => $this->short_description,
            'description' => $this->description,
            'privacy' => $this->privacy,
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo', self::$convert)),
            'goal_ratio' => (isset($this->goals_count) && $this->goals_count > 0) ? ($achieved/$goals) : 0,
            'goal_percent' => (isset($this->goals_count) && $this->goals_count > 0) ? number_format($achieved/$goals, 1) : 0,
            'address' => $this->address,
            'location' => $this->location,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'campus' => new CampusResource($this->whenLoaded('campus',optional($this->campus)->first())) 
        ];
    }
}
