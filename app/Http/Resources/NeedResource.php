<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NeedResource extends JsonResource
{
    protected $complete = false;
    public function __construct($need, $complete = false)
    {
        parent::__construct($need);
        $this->complete = $complete;
    }
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
            'type' => $this->whenLoaded('type', optional($this->type)->name),
            'lctype' => $this->whenLoaded('type', strtolower(optional($this->type)->name)),
            'goal' => $this->goal,
            'status' => $this->setStatus(),
            'date' => optional($this->scheduled_at)->format('m/d/Y'),//'08/27/2020'
            'time' => strtolower(optional($this->scheduled_at)->format('h:i A')),
            'organization' => $this->whenLoaded('organization', $this->parseOrg()),
            'lat' => (float) $this->lat,
            'lng' => (float) $this->lng,
            'category' => $this->whenLoaded('categories', $this->categories->pluck('name')),
            'photo' => $this->getFirstMediaUrl('photo'),
            'ratio' => $this->getRatio(),
            'description' => $this->description,
            'raised' => $this->raised
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

    protected function setStatus()
    {
        if(is_null($this->approved_at))
            return 'pending';

        if($this->raised >= $this->goal)
            return 'achieved';
        else 
            return 'on-going';
    }

    protected function getRatio()
    {
        if($this->goal <= 0)
            return 0;

        if($this->raised > $this->goal)
            return 100;

        return number_format(($this->raised / $this->goal) * 100, 1);
    }
}
