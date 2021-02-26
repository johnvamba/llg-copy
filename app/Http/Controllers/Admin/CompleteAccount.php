<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\OrgInvites;
use DB;

class CompleteAccount extends Controller
{
    public function __invoke(Request $request) {
    	DB::beginTransaction();
    	try {
	    	$request->validate([
	    		'token' => 'required|string',
	    		'email' => 'required|email',
	    		'password' => 'required|string|min:8'
	    	]);

	    	$invite = OrgInvites::with('organization')
	    		->where('email', $request->get('email'))
	    		->where('token', $request->get('token'))
	    		->firstOrFail();

	        $user = User::create([
	            'email' => $request->get('email'),
	            'password' => bcrypt($request->get('password')),
	            'name'  => $invite->first_name. ' ' .$invite->last_name
	        ]);

	        $role = Role::where('name', 'organization admin')->first();
	        $user->syncRoles( $role->name );

	        $user->organizationMembers()->create([
	            'organization_id' => $invite->org_id,
	            'status' => 'approved'
	        ]);

	        $user->profile()->create(
	            [
	                'first_name' => $invite->first_name,
	                'last_name' => $invite->last_name,
	                'location' => optional($invite->organization)->location ?? 'Sydney, Australia',
	                'lat' => optional($invite->organization)->lat ?? -33.868782, 
	                'lng' => optional($invite->organization)->lng ?? 151.207583,
	                'age' => 18,
	                'bio' => 'No description'
	            ]
	        );

	        $invite->delete(); //Flush
	        DB::commit();
	        return response()->json(['message' => 'Success'], 200);
    	} catch (\Exception $e) {
    		DB::rollback();
    		return response()->json(['message' => $e->getMessage()], 400);
    	}
    }
}
