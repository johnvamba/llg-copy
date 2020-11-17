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
            $org = factory(\App\Organization::class)->create();

            $category = \App\NeedsCategory::all();

            $type = \App\NeedsType::get();

            for ($i=0; $i < 5 ; $i++) { 
                # code...
                $need = factory(\App\Need::class)->create([
                    // 'model_id' => $org->id,
                    // 'model_type' => 'App\Organization',
                    'organization_id' => $org->id,
                    // 'needs_category_id' => $category->id,
                    'needs_type_id' => $type->random()->id
                ]);

                $need->categoryList()->sync($category->random(rand(1,3)));
            }
        });
    }
}
