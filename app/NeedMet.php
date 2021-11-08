<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

use App\Helper\Traits\NeedMetPortalTrait;

class NeedMet extends Model
{
    use NeedMetPortalTrait;

    protected $guarded = [];

    protected $appends = ['created'];

    public function model()
    {
        return $this->morphTo();
    }

    public function need()
    {
        return $this->belongsTo('App\Need', 'need_id')->withTrashed();
    }

    public function need_type()
    {
        return $this->hasOneThrough(NeedsType::class, Need::class, 'id', 'id', 'need_id', 'needs_type_id')->withTrashed();
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
