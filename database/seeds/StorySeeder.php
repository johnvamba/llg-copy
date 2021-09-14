<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Story;

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

            $orgUser = \App\User::inRandomOrder()->whereHas('roles', fn($role) => $role->where('name', 'organization admin'))->first();

            $this->runStoryComments($faker);
            return;

            for ($i=0; $i < 20; $i++) { 
                $org = \App\Organization::inRandomOrder()->first();
                # code...
                $story = factory(Story::class)->create([
                    'user_id' => $orgUser->id, 
                    'organization_id' => $org->id,
                    'posted_at' => $faker->boolean(50) ? now() : null
                ]);

                for ($x=0; $x < 5; $x++) { 
                    $user = \App\User::inRandomOrder()->whereHas('roles', fn($role) => $role->where('name', 'user'))->first();
                    # code...
                    factory(\App\StoryAppreciate::class)->create([
                        'user_id' => $user->id, 
                        'story_id' => $story->id, 
                    ]);

                    factory(\App\CommentStory::class)->create([
                        'user_id' => $user->id, 
                        'story_id' => $story->id,
                        'comment' => $faker->text
                    ]);
                }
            }

        });
    }

    protected function runStoryComments($faker)
    {
        Story::all()->each(function($story) use ($faker) {
            for ($x=0; $x < 5; $x++) { 
                $user = \App\User::inRandomOrder()->whereHas('roles', fn($role) => $role->where('name', 'user'))->first();
                factory(\App\StoryAppreciate::class)->create([
                    'user_id' => $user->id, 
                    'story_id' => $story->id, 
                ]);

                factory(\App\CommentStory::class)->create([
                    'user_id' => $user->id, 
                    'story_id' => $story->id,
                    'comment' => $faker->text
                ]);
            }
        });
    }
}
