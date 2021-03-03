<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\User;
use Spatie\Permission\Models\Role;
use App\OrgInvites;

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

	        $user = User::firstOrCreate([
	            'email' => $request->get('email'),
	            'name'  => $invite->first_name. ' ' .$invite->last_name,
	        ]); //If nalahi gani then stop access. like dili dapat duplicate ang email with differnet name. dapat insist siya nga same ang duha

	        //does not override password
			$user->password = ($user->password == '') ? bcrypt($request->get('password')) : $user->password;

	        $user->email_verified_at = now(); //auto verify user if naa sila link
	        $user->mobile_number = $invite->phone;
	        $user->update();

	        $role = Role::where('name', 'organization admin')->first();
	        $user->syncRoles( $role->name ); // remove other roles in the process

	        $user->organizationMembers()->create([
	            'organization_id' => $invite->org_id,
	            'status' => 'approved'
	        ]);

	        //Does not edit profile settings, instead creates for newly created user
	        if($user->wasRecentlyCreated) {
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
	        }

	        $invite->delete(); //Flush
	        DB::commit();
	        return response()->json(['message' => 'Success'], 200);
    	} catch (\Exception $e) {
    		DB::rollback();
    		return response()->json(['message' => $e->getMessage()], 400);
    	}
    }
}
