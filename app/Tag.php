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

    public static function createTag($model, $tags)
    {
        $createdTag = [];

        foreach ($tags as $tag) {
            $makeTag = Tag::make([
                    'name' => $tag
                ]);

            $createdTag[] = $model->tags()->save($makeTag);
        }

        return $createdTag;
    }
}
