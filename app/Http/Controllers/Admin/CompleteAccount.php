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

	    	$invite = OrgInvites::with(['organization'=>fn($org)=>$org->unfilter()])
	    		->where('email', $request->get('email'))
	    		->where('token', $request->get('token'))
	    		->firstOrFail();

	    	if($user = User::unfilter()->where('email', $request->get('email'))->first()) {
	    		// if($user->name !== ($invite->first_name. ' ' .$invite->last_name))
	    		// 	$user->fill(['name' => $invite->first_name. ' ' .$invite->last_name ]);
	    		// 	throw new \Exception("User already exists but with different name. Please contact us if this wrong");
	    	} else {
		        $user = User::firstOrCreate([
		            'email' => $request->get('email'),
		            'name'  => $invite->first_name. ' ' .$invite->last_name,
		        ]); 
		        //If nalahi gani then stop access. like dili dapat duplicate ang email with differnet name. dapat insist siya nga same ang duha
	    	}
	        
	        $message = 'Success';
	        if(
	        	in_array(strtolower($user->email), [
	        		'tamara.espinet26@gmail.com',
	        		env('ADMIN_EMAIL', 'admin@gmail.com'),
	        		env('MAIL_FROM_ADDRESS', 'info@lovelivesgenerously.demosite.ninja')
	        	])
			) {
	        	$message = 'Admin email has protection and thus removing invite';
	        	goto skip;
	        }

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
	        skip:
	        $invite->delete(); //Flush
	        DB::commit();
	        return response()->json(['message' => $message], 200);
    	} catch (\Exception $e) {
    		DB::rollback();
    		return response()->json(['message' => $e->getMessage()], 400);
    	}
    }
}
