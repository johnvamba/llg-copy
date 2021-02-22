<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $guarded = [];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public static function storeNotification($model, $params) 
    {
        $init = Notification::make([
            'user_id' => auth()->user()->id,
            'description' => $params['description'],
            'type' => $params['type'],
            'isRead' => $params['isRead']
        ]);

        $notification = $model->notifications()->save($init);

        return $notification;
    }
}
