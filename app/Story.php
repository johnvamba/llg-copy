<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

use App\Helper\Traits\StoryPortalTrait;

use Prezly\DraftPhp\Converter as DraftConverter;
use App\Custom\PhpDraftjsHtml\Converter;

class Story extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use StoryPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    protected $dates = ['posted_at'];
    
    protected $with = ['tags'];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function user_profile()
    {
        return $this->hasOneThrough('App\UserProfile', 'App\User', 'id', 'user_id', 'user_id', 'id');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }

    public function campus()
    {
        return $this->hasOneThrough(Campus::class, CampusOrganisation::class, 'organization_id', 'id', 'organization_id', 'campus_id');
    }

    public function appreciates()
    {
        return $this->hasMany('App\StoryAppreciate');
    }
    
    public function comments()
    {
        return $this->hasMany('App\CommentStory');
    }

    //Categories
    public function categories()
    {
        return $this->morphToMany("App\Category", "categorize", 'categorizes');;
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }

    public function toHtml(){
        if(!is_null($this->raw_draft_json)){
            $contentState = DraftConverter::convertFromRaw( json_decode($this->raw_draft_json) );
            return (new Converter)
                ->setState($contentState)
                ->toHtml();
        }

        return '';
    }

    public function getExternalUrlAttribute() {
        return config('app.landsite', 'https://app.neuma.church') . '/story/?id='. $this->id;
    }
}
