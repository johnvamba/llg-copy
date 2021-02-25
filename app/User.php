<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Helper\Traits\UserPortalTrait;
use App\Mail\PasswordReset\ResetPasswordNotification;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use HasRoles;
    use SoftDeletes;
    use UserPortalTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function needsMet()
    {
        return $this->morphMany('App\NeedMet', 'model');
    }
    
    public function goals()
    {
        return $this->morphMany('App\Goal', 'model');
    }

    public function organizationMembers()
    {
        return $this->morphMany('App\OrganizationMember', 'model');
    }

    public function campus()
    {
        //Technically if user can be on many campuses this should be hasManyThrough
        return $this->hasOneThrough(Campus::class, CampusUser::class, 'user_id', 'id', 'id', 'campus_id');
    }

    public function organization()
    {
        //Technically if user can be on many orgs this should be hasManyThrough
        return $this->hasOneThrough(Organization::class, OrganizationMember::class, 'model_id', 'id', 'id', 'organization_id');
    }

    public function offers()
    {
        return $this->morphMany('App\ServiceOffer', 'model');
    }

    public function profile()
    {
        return $this->hasOne('App\UserProfile');
    }

    public function invoice()
    {
        return $this->hasMany('App\Invoice');
    }

    public function groups_member()
    {
        return $this->hasManyThrough('App\Group', 'App\GroupParticipant', 'user_id', 'id', 'id', 'group_id');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity');
    }
    
    public function group_pivots()
    {
        return $this->hasMany('App\GroupParticipant', 'user_id');
    }
    /**
     * Register new user
     */
    public static function register($request)
    {
        $createdUser = User::create(
                array_merge(
                    $request->only([
                        'email',
                    ]), [
                        'password' => bcrypt($request->password),
                        'name' => $request->firstName.' '.$request->lastName
                    ]
                )
            );

        return $createdUser;
    }

    // public function sendPasswordResetNotification($token)
    // {
    //     $this->notify(new ResetPasswordNotification($token));
    // }
}
