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
    		$org_count = rand(1,3);
    		$team = rand(1,3);

			$campus_admin = factory(\App\User::class)->create();
			$campus_admin->assignRole('campus admin');
			CampusUser::create([
				'user_id' => $campus_admin->id,
				'campus_id' => $campus->id
			]);

	    	for ($i=0; $i < $org_count; $i++) { 
	        	$org = \factory(Organization::class)->create();
	        	
	    		CampusOrganisation::create([
	    			'campus_id' => $campus->id,
	    			'organization_id' => $org->id 
	    		]);

	        	$categories = OrganizationCategory::inRandomOrder()->take(rand(1,2))->get();
	        	//Change this later
        		$categories->each(function($cat) use ($org){
        			OrganizationHasCategory::create([
        				'organization_category_id' => $cat->id,
        				'model_type' => Organization::class,
        				'model_id' => $org->id
        			]);
        		});

	        	for ($u=0; $u < $team; $u++) { 
	        		if($u == 0){
			            $orgUser = factory(\App\User::class)->create();
			            $orgUser->assignRole('organization admin');
	        		} else {
	        			$orgUser = factory(\App\User::class)->create();
			            $orgUser->assignRole('user');
	        		}
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
