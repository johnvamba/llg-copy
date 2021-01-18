<?php

namespace App\Helper\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class OrgPortalScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        //Check FilterByUserType
        if(($user = auth()->user()) && session('filterOn', false)){
            if($user->hasRole('user')){
                $builder->whereHasMorph('members', 
                    ['App\User'], fn($member) => $member->where('users.id', $user->id));
            } else if($user->hasRole('organization admin')){
                $builder->where('organizations.id', session('org_id', 0));
            } else if($user->hasRole('campus admin')){
                // $builder->whereHas('campus', fn($camp) => $camp->where('campuses.id', session('camp_id', 0)));
            } else if($user->hasRole('admin')){
                // return;
            }
        }
    }
}