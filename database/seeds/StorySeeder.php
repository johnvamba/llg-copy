<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {
            $faker = \Faker\Factory::create();

            $orgUser = factory(\App\User::class)->create();
            $orgUser->assignRole('organization admin');

            $user = factory(\App\User::class)->create();
            $user->assignRole('user');

            $org = factory(\App\Organization::class)->create();

            $story = factory(\App\Story::class)->create([
                'user_id' => $orgUser->id, 
                'organization_id' => $org->id, 
            ]);

            factory(\App\StoryAppreciate::class)->create([
                'user_id' => $user->id, 
                'story_id' => $story->id, 
            ]);

            factory(\App\CommentStory::class)->create([
                'user_id' => $user->id, 
                'story_id' => $story->id,
                'comment' => $faker->text
            ]);
        });
    }
}
