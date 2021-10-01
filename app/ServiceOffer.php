<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Carbon\Carbon;
use App\Helper\Traits\OfferPortalTrait;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ServiceOffer extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    use OfferPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    protected $with = ['tags'];

    public function model()
    {
        return $this->morphTo(); //I am user or group or campus or anything
    }

    public function tags()
    {
        return $this->morphMany('App\Tag', 'model');
    }
    //Depreciated
    // public function user()
    // {
    //     return $this->belongsTo('App\User');
    // }

    public function serviceType()
    {
        return $this->belongsTo('App\ServiceType');
    }

    public function reports()
    {
        return $this->hasMany(ReportUse::class, 'offer_id');
    }

    // public function organization() //Nothing herrre.
    // {
    //     return $this->belongsTo('App\Organization');
    // }

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

    public function registerMediaConversions(Media $media=null) : void
    {
        $this->addMediaConversion('listing')
            ->width(30)
            ->performOnCollections('photo')
            ->nonQueued();

        $this->addMediaConversion('view')
            ->width(485)
            ->performOnCollections('photo')
            ->nonQueued();
    }
}
