<?php

namespace App\Helper\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class GroupPortalScope implements Scope
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
        //Check FilterByGroupType
        if(($user = auth()->user()) && session('filterOn', false)){
            if($user->hasRole('user')){
                $builder->where('user_id', $user->id) //as user
                ->orWhereHas('groups.participants', fn($participants) => $participants->where('user_id', $user->id)->where('status','approved') ); //As participant
            } else if($user->hasRole('organization admin')){
                //Group unfiltered
            } else if($user->hasRole('campus admin')){
                $builder->whereHas('campus', fn($campus) => $campus->where('campuses.id', session('camp_id')) ); //
                //Group unfiltered
            } else if($user->hasRole('admin')){
                return;
            }
        }
    }
}