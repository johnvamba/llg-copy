<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class ShortLivedAuthenticate
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
        if($id = $request->get('u_id')){
            Auth::loginUsingId($id);
        }

        return $next($request);
    }

}
