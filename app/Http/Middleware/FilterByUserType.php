<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class FilterByUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($user = auth()->user()){
            if(!$user->hasRole('admin') && !session()->has('filterOn')){
                $user->loadMissing([
                    'organization' => fn($q)=>$q->withoutGlobalScopes(), 
                    'campus' => fn($q)=>$q->withoutGlobalScopes()]);
                Session::put('filterOn', true);
                Session::put('camp_id', optional($user->campus)->id);
                Session::put('org_id', optional($user->organization)->id);
            } else {
                Session::forget(['camp_id', 'org_id']);
            }
        } else {
            Session::forget(['filterOn', 'camp_id', 'org_id']);
        }
        return $next($request);
    }
}
