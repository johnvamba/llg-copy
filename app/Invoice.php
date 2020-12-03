<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

use App\Helper\Traits\InvoicePortalTrait;

class Invoice extends Model
{
    //
    use InvoicePortalTrait;
    
    protected $guarded = [];

    protected $appends = ['created'];

    protected $with = ['model'];

    public function model()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }

    /**
     * @return string
     */
    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->diffForHumans();
    }
}
