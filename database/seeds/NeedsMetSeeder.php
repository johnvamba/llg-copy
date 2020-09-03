<?php

use Illuminate\Database\Seeder;

class NeedsMetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(\App\User::class)->create();

        $category = factory(\App\NeedsMetCategory::class)->create();
        $type = factory(\App\NeedsMetType::class)->create();

        $contents = factory(\App\Content::class, 4)->create([
            'user_id' => $user->id,
            'type' => 'needs',
        ]);

        foreach ($contents as $content) {
            factory(\App\NeedsMet::class)->create([
                'content_id' => $content->id,
                'needs_met_category_id' => $category->id,
                'needs_met_type_id' => $type->id
            ]);
        }
    }
}
