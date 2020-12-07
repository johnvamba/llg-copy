<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Organization;

class CheckEmail extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $query = null;
        switch($request->get('type')){
            case 'organization':
            $query = Organization::query();
            break;
            case 'user':
            default:
            $query = User::query();
        }

        $email = $request->get('email');
        
        if($query && $email) {
            $query->where('email', $email);
        }

        return response()->json(['email' => $email, 'status' => $query->exists() ? 'exists' : 'free'], 200);
    }
}
