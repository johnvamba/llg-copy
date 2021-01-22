<?php

namespace App\Helper\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use App\Helper\Scopes\UserPortalScope;
use App\Organization;
use App\User;

class OfferPortalScope implements Scope
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
                // $builder->where('user_id', $user->id) //as user
                $builder->where('model_id', $user->id)->where('model_type', User::class);
            } else if($user->hasRole('organization admin')){
                $builder->where('model_id', session('org_id'))->where('model_type', Organization::class); //force 0 output
            } else if($user->hasRole('campus admin')){
                $builder->whereHasMorph('model', 
                    ['App\User'], 
                    fn($userQuery) => $userQuery
                        ->withoutGlobalScope(UserPortalScope::class) //since the user query has auto filtered by class we need to remove it temporarily
                        ->whereHas('campus', fn($camp) => $camp->where('campuses.id', session('camp_id', 0)))
                        ->orWhereHas('organization.campus', fn($camp) => $camp->where('campuses.id', session('camp_id', 0)))
                )->orWhere(function($query){
                    $query->where('model_id', session('camp_id', 0))
                        ->where('model_type', Campus::class);
                });
                // $builder->whereHas('campus', fn($camp) => $camp->where('campuses.id', session('camp_id', 0)));
            } else if($user->hasRole('admin')){
                return;
            }
        }
    }
}