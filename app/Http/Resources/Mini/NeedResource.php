<?php

namespace App\Http\Resources\Mini;

use Illuminate\Http\Resources\Json\JsonResource;

class NeedResource extends JsonResource
{
    static $convert = '';

    public static function setConversion($convert = ''){
        self::$convert = $convert;
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
            'goal' => $this->goal,
            'date' => $this->created,
            'photo' => $this->getFirstMediaUrl('photo', self::$convert),
            'ratio' => $this->getRatio(),
            'description' => $this->description,
            'raised' => $this->raised
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
