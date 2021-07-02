<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Async\OrganizationResource;

class NeedResource extends JsonResource
{
    protected $complete = false;

    static $convert = '';

    public function __construct($need, $complete = false)
    {
        parent::__construct($need);
        $this->complete = $complete;
    }

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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->whenLoaded('type', optional($this->type)->name),
            'lctype' => $this->whenLoaded('type', strtolower(optional($this->type)->name)),
            'goal' => $this->goal,
            'status' => $this->setStatus(),
            'date' => optional($this->scheduled_at)->format('m/d/Y'),//'08/27/2020'
            'time' => strtolower(optional($this->scheduled_at)->format('h:i A')),
            'date_added' => optional($this->created_at)->format('m/d/Y'),
            'organization' => new OrganizationResource($this->whenLoaded('organization')),
            'lat' => (float) $this->lat,
            'lng' => (float) $this->lng,
            'location' => $this->location,
            'category' => $this->whenLoaded('categories', $this->categories->pluck('name')),
            'photo' => $this->getFirstMediaUrl('photo', static::$convert),
            'ratio' => $this->getRatio(),
            'description' => $this->description,
            'requirements' => $this->requirements,
            'raised' => $this->raised,
            'address' => $this->address,
            'pk' => $this->when(isset($this->pk), $this->pk),
            'need_link' => $this->need_link,
            // contribution loaded when search on one user. check Admin/UsersController
            'contri_amount' => $this->whenLoaded('contribution', fn()=> optional($this->contribution)->amount),
            'contri_date' => $this->whenLoaded('contribution', fn()=> optional($this->contribution)->created)
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

        if(now()->gt($this->ended_at)) {
            if($this->raised >= $this->goal)
                return 'achieved';
              
            return 'lapsed';
        }
            
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
