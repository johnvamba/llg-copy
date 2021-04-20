<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailControllers extends Controller
{
    public function orgInvite($request) {
    	return view('email.org_invite');
    }
}
