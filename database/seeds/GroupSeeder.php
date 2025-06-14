<?php

use Illuminate\Database\Seeder;

use App\GroupParticipant;
use App\Organization;
use App\Group;
use App\Goal;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Organization::has('members')->with('members')->inRandomOrder()->take(5)->get()->each(function($org) {
        	$rand = random_int(20, 50);
			$user = $org->members->random();

        	\factory(Group::class, $rand)
        		->create([
	        		'user_id' => $user->id
	        	])
        		->each(function($grp) use ($org) {
        			$otherUser = $org->members->random();
        			if($otherUser)
        				GroupParticipant::firstOrCreate([
        					'group_id' => $grp->id,
        					'user_id'=> $otherUser->id,
        					'status' => 'approved'
						]);
						
					$makeGoal = Goal::make([
							'term' => 'year',
							'need' =>  8
						]);

					$grp->goals()->save($makeGoal);
        		});
        });
    }
}
