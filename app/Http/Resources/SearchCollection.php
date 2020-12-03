<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SearchCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'needs' => $this->when($this->get('needResults')->isNotEmpty(), $this->transformNeeds()),
            'stories' => $this->when($this->get('storyResults')->isNotEmpty(), $this->transformStories()),
            'offers' => $this->when($this->get('offersResults')->isNotEmpty(), $this->transformOffers()),
            'organisations' => $this->when($this->get('orgResults')->isNotEmpty(), $this->transformOrgs()),
            'groups' => $this->when($this->get('groupResults')->isNotEmpty(), $this->transformGroups())
        ];
    }

    protected function transformNeeds() 
    {
        return optional($this->get('needResults'))
            ->map(fn($need) => $need->only(['id', 'title']) ) ?? [];
    }

    protected function transformStories() 
    {
        return optional($this->get('storyResults'))
            ->map(fn($story) => $story->only(['id', 'title']) ) ?? [];
    }

    protected function transformOffers() 
    {
        return optional($this->get('offerResults'))
            ->map(fn($offer) => $offer->only(['id', 'title']) ) ?? [];
    }

    protected function transformOrgs() 
    {
        return optional($this->get('orgResults'))
            ->map(fn($org) => $org->only(['id', 'name']) ) ?? [];
    }

    protected function transformGroups() 
    {
        return optional($this->get('groupResults'))
            ->map(fn($group) => $group->only(['id', 'name']) ) ?? [];
    }
}
