<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{

    protected $viewAll = false;
    static $convert = '';

    public function __construct($resource, $viewAll = false){
        parent::__construct($resource);
        $this->viewAll = $viewAll;
    }

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
            'short_description' => $this->short_description,
            'comments_count' => $this->when(isset($this->comments_count), $this->comments_count, 0),
            'org_name' => $this->when($this->relationLoaded('organization'), fn() => optional($this->organization)->name),
            'org_photo' => $this->when($this->relationLoaded('organization'), 
                fn() => optional($this->organization)->getFirstMediaUrl('photo', self::$convert)),
            'shares_count' => 0,
            'appreciates_count' => $this->when(isset($this->appreciates_count), $this->appreciates_count, 0),
            'date_numb' => optional($this->posted_at)->format('m/d/y'),
            'photo' => $this->whenLoaded('media', $this->getFirstMediaUrl('photo', self::$convert)),
            'date' => optional($this->posted_at)->format('M j, Y'),
            'released_at' => $this->posted_at,
            'author_org' => $this->when(isset($this->author_org), $this->author_org === 1),
            'submit_date' => optional($this->submitted_at)->format('M j, Y'),
            'description' => $this->when($this->viewAll, $this->description),
            'categories' => $this->when($this->relationLoaded('categories') && $this->viewAll, optional($this->categories)->pluck('name')),
            'raw_draft_json' => $this->when($this->viewAll, $this->raw_draft_json),
            'as_html' => $this->when($this->viewAll, $this->toHtml()),
            'organization' => $this->when($this->relationLoaded('organization') && $this->viewAll, $this->morphOrganization())
        ];
        // return parent::toArray($request);
    }

    protected function morphOrganization() {
        if(isset($this->organization)){
            return [
                'id' => optional($this->organization)->id,
                'value' => optional($this->organization)->id,
                'label' => optional($this->organization)->name,
            ];
        }
    }
}
