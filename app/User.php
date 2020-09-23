<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use HasRoles;
    use SoftDeletes;

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

    public function goals()
    {
        return $this->morphMany('App\Goal', 'model');
    }

    public function organizationMembers()
    {
        return $this->morphMany('App\OrganizationMember', 'model');
    }

    public function profile()
    {
        return $this->hasOne('App\UserProfile');
    }

    public function invoice()
    {
        return $this->hasMany('App\Invoice');
    }

    /**
     * Register new user
     */
    public static function register($request)
    {
        $createdUser = User::create(
                array_merge($request->only([
                    'name',
                    'email',
                ]), ['password' => bcrypt($request->password)])
            );

        return $createdUser;
    }
}
