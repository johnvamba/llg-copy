<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
            $now = Carbon::now()->subYear();

            for ($m=0; $m < 12; $m++) {
                $round = rand(1, 6); 
                for ($i=0; $i < $round; $i++) { 
                    # code...
                    $org = \App\Organization::inRandomOrder()->first();
                    //Change this
                    $category = \App\NeedsCategory::inRandomOrder()->get();

                    for ($u=0; $u < 5 ; $u++) { 
                        $randType = rand(1,3);
                        # code...
                        $test = (clone $now)->addDays(rand(1,30));

                        $need = factory(\App\Need::class)->create([
                            'organization_id' => $org->id,
                            'needs_type_id' => $randType,
                            'created_at' => $test,
                            'updated_at' => $test
                        ]);

                        $need->categories()->sync($category->random(rand(1,2)));
                    }
                }
                $now->addMonth();
            }
        });
    }
}
