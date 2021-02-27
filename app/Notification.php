<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Notification extends Model
{
    //
    protected $guarded = [];

    protected $appends = ['created'];

    public function model()
    {
        return $this->morphTo();
    }

    public function to()
    {
        return $this->belongsTo('App\User', 'to');
    }

    public function from()
    {
        return $this->belongsTo('App\User', 'from');
    }

    public static function storeNotification($model, $params) 
    {
        $init = Notification::make([
            'from' => auth()->user()->id,
            'to' => $params['to'],
            'description' => $params['description'],
            'type' => $params['type'],
            'isRead' => $params['isRead']
        ]);

        $notification = $model->notifications()->save($init);

        return $notification;
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
