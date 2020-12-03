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
            for ($i=0; $i < 4; $i++) { 
                # code...
                $org = \App\Organization::inRandomOrder()->first();
                //Change this
                $category = \App\NeedsCategory::inRandomOrder()->get();

                $type = \App\NeedsType::get();

                for ($u=0; $u < 5 ; $u++) { 
                    # code...
                    $need = factory(\App\Need::class)->create([
                        'organization_id' => $org->id,
                        'needs_type_id' => $type->random()->id
                    ]);

                    $need->categories()->sync($category->random(rand(1,3)));
                }
            }
        });
    }
}
