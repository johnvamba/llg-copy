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
        // dd($this->when($this->relationLoaded('organization'), 'haa?'));
        return [
            'id' => $this->id,
            'org_name' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->name),
            'email' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->email),
            'phone_number' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->phone_number),
            'need_title' => $this->when($this->relationLoaded('model'), fn() => (optional($this->model)->title ?? optional($this->model)->name), "Missing need"),
            'amount' => $this->amount,
            'date' => $this->created_at->format('m/d/y'),
            'giversName' => $this->when($this->relationLoaded('user'), fn()=> optional($this->user)->name, "Missing Giver"),
        ];
    }
}
