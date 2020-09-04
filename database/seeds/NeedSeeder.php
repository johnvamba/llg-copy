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

            $category = factory(\App\NeedsCategory::class)->create();

            $type = factory(\App\NeedsType::class)->create();

            $needs = factory(\App\Need::class, 5)->create([
                'model_id' => $org->id,
                'model_type' => 'App\Organization',
                'needs_category_id' => $category->id,
                'needs_type_id' => $type->id
            ]);
        });
    }
}
