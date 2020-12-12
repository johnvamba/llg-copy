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
            'org_id' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->id),
            'org_photo' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->getFirstMediaUrl('photo')),

            'email' => $this->when($this->relationLoaded('user'), fn() => optional($this->user)->email),
            'phone_number' => $this->when($this->relationLoaded('user'), fn() => optional($this->user)->phone_number),
            'giversName' => $this->when($this->relationLoaded('user'), fn() => optional($this->user)->name, "Missing Giver"),

            'need_title' => $this->when($this->relationLoaded('model'), fn() => (optional($this->model)->title ?? optional($this->model)->name)),
            'need_desc' => $this->when($this->relationLoaded('model'), fn() => (optional($this->model)->description ?? optional($this->model)->description)),
            'need_photo' => $this->when($this->relationLoaded('model'), fn() => optional($this->model)->getFirstMediaUrl('photo')),
            'need_raised' => $this->when($this->relationLoaded('model'), fn() => optional($this->model)->raised),
            'need_goal' => $this->when($this->relationLoaded('model'), fn() => optional($this->model)->goal),

            'amount' => $this->amount,
            'date' => $this->created_at->format('m/d/Y'),
        ];
    }
}
