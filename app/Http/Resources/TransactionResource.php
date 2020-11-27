<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'org_name' => $this->when($this->relationLoaded('organization'), optional($this->organization)->name),
            'email' => $this->when($this->relationLoaded('organization'), optional($this->organization)->email),
            'phone_number' => $this->when($this->relationLoaded('organization'), optional($this->organization)->number),
            'amount' => $this->amount,
            'date' => $this->created_at->format('m/d/y'),
            'given_name' => $this->when($this->relationLoaded('user'), optional($this->user)->name),
        ];
    }
}
