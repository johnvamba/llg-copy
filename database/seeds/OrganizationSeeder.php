<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Campus;
use App\CampusUser;
use App\CampusOrganisation;
use App\Organization;
use App\OrganizationMember;
use App\OrganizationCategory;
use App\OrganizationHasCategory;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Campus::all()->each(function($campus){
    		//$org_count = random_int(1,5);
    		//$team = random_int(1,5);

			$campus_admin = factory(\App\User::class)->create(['email' => 'campus'.$campus->id.'@neuma.test']);

			$campus_admin->assignRole('campus admin');

			\factory(\App\UserProfile::class)->create([ 'user_id' => $campus_admin->id]);

			CampusUser::create([
				'user_id' => $campus_admin->id,
				'campus_id' => $campus->id
			]);

	    	for ($i=0; $i < 5; $i++) { 
	        	$org = \factory(Organization::class)->create();
	        	
	    		CampusOrganisation::create([
	    			'campus_id' => $campus->id,
	    			'organization_id' => $org->id 
	    		]);

	        	$categories = OrganizationCategory::inRandomOrder()->take(rand(1,2))->get();

	        	$org->categories()->sync($categories);

	        	for ($u=0; $u < 5; $u++) { 
	        		if($u == 0){
			            $orgUser = factory(\App\User::class)->create(['email' => 'org'.$u.'-'.$org->id.'@neuma.test']);
			            $orgUser->assignRole('organization admin');
	        		} else {
	        			$orgUser = factory(\App\User::class)->create(['email' => 'org'.$u.'-'.$org->id.'@neuma.test']);;
			            $orgUser->assignRole('user');
	        		}
	        		\factory(\App\UserProfile::class)->create([ 'user_id' => $orgUser->id]);
	        		OrganizationMember::create([
	        			'organization_id' => $org->id,
	        			'model_id' => $orgUser->id,
	        			'model_type' => User::class,
	        			'status' => 'approved'
	        		]);
	        	}
	    	}
    	});
    }
}
