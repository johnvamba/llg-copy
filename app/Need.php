<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;

use App\Helper\Traits\NeedPortalTrait;

class Need extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use NeedPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    protected $dates = ['scheduled_at', 'ended_at'];

    protected $with = ['tags'];

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }

    public function invoices()
    {
        return $this->morphMany('App\Invoice', 'model');
    }

    public function activity()
    {
        return $this->morphMany('App\Activity', 'model');
    }

    public function categories()
    {
        //
        return $this->morphToMany("App\Category", "categorize", 'categorizes');
    }

    public function contribution()
    {
        return $this->hasOne('App\NeedMet', 'need_id');
    }
    
    public function contributors()
    {
        return $this->morphedByMany('App\ScopedUser', 'model', 'need_mets');
    }

    public function mets()
    {
        return $this->hasMany('App\NeedMet');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization', 'organization_id');
    }

    public function getOnGoingAttribute(){
        return $this->raised < $this->goal;
    }

    public static function scopeOnlyOnGoing($query) {
        return $query->whereRaw('raised < goal')->whereNotNull('approved_at');
    }

    public function campus()
    {
        return $this->hasOneThrough(Campus::class, 
            CampusOrganisation::class, 
            'organization_id', 
            'id', 'organization_id', 'campus_id');
    }

    public function type()
    {
        return $this->belongsTo('App\NeedsType', 'needs_type_id');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    /**
     * Set short description column value
     */
    public function setShortDescriptionAttribute($value)
    {
        $this->attributes['short_description'] = substr($value, 0, 40).'...';
    }

    public function registerMediaConversions(Media $media=null) : void
    {
        $this->addMediaConversion('listing')
            ->width(30)
            // ->height(30)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('invoice')
            ->width(85)
            // ->height(60)
            // ->sharpen(10)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('view') //default
            ->width(390)
            // ->height(150)
            // ->sharpen(10)
            ->performOnCollections('photo')
            ->nonQueued();
    }
}
