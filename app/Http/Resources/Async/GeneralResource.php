<?php

namespace App\Http\Resources\Async;

use Illuminate\Http\Resources\Json\JsonResource;

class GeneralResource extends JsonResource
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
            'id'    => $this->id, //We need only this.
            'label' => $this->name ?? $this->title, //we show this.
            'value' => $this->id
        ];
    }
}
