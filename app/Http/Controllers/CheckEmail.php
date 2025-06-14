<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ScopedUser as User;
use App\Organization;
use App\OrgInvites;


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
        $request->validate([
            'email' => 'required|email' 
        ]);
        
        $query = null;
        switch($request->get('type')){
            case 'organisation':
            case 'organization':
            $query = Organization::query();
            break;
            case 'invitation':
            $query = OrgInvites::query();
            break;
            case 'user':
            default:
            $query = User::query();

        }

        $email = $request->get('email');
        
        if($query && $email) {
            $query->unfilter()->where('email', $email);
        }

        return response()->json(['email' => $email, 'status' => $query->exists() ? 'exists' : 'free'], 200);
    }
}
