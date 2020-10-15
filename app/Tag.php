<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }

    /**
     * Create a tag of a model
     * 
     * @return collection
     */
    public static function createTag($model, $tags)
    {   
        $results = [];

        foreach (json_decode($tags) as $tag) {
            $makeTag = Tag::make(['name' => $tag]);
            $results[] = $model->tags()->save($makeTag);
        }

        return $results;
    }
}
