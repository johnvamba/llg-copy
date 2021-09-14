<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

use App\Helper\Scopes\CommentStoryScope;

class CommentStory extends Model implements HasMedia
{
    //
    use InteractsWithMedia;
    
    protected $guarded = [];

    protected $appends = ['created'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function user_profile()
    {
        return $this->belongsTo('App\UserProfile', 'user_id', 'user_id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }

    public static function scopesShowVisible($query, $bool = false){
        return $query->where('hide', $bool);
    }

    public function toHide($bool = true)
    {
        $this->hide = $bool ?? false;
        $this->save();

        return $this;
    }
}
