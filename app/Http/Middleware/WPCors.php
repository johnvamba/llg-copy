<?php

namespace App\Http\Middleware;

use Closure;

class WPCors
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
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*') // add domain of wp landing page here
            ->header('Access-Control-Allow-Methods', 'GET, POST') //only get and post lang required
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth');
    }
}
