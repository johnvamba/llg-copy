<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NeedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        DB::transaction(function () {
            // $org = factory(\App\Organization::class)->create();
            // $category = factory(\App\NeedsCategory::class)->create();
            for ($i=0; $i < 3; $i++) { 
                # code...
                $org = \App\Organization::inRandomOrder()->first();
                //Change this
                $category = \App\NeedsCategory::inRandomOrder()->first();

                $type = \App\NeedsType::get();

                $needs = factory(\App\Need::class, 3)->create([
                    // 'model_id' => $org->id,
                    // 'model_type' => 'App\Organization',
                    'organization_id' => $org->id,
                    // 'needs_category_id' => $category->id,
                    'needs_type_id' => $type->random()->id
                ]);
            }

        });
    }
}
