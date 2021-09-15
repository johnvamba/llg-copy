<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Category;
use App\Categorizes;
use DB;

class UpdateCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $categories = Category::select('name', 'type', DB::raw('count(*) as `count`'))
            ->groupBy('name', 'type')
            ->having('count', '>', 1)
            ->get();

        $categories->each(function($category) {
            $ids = Category::select('id')
                ->where('name', $category->name)
                ->where('type', $category->type)
                ->orderBy('id', 'asc')
                ->pluck('id');

            $primaryId = $ids->shift();

            Categorizes::whereIn('category_id', $ids->all())
                ->update(['category_id' => $primaryId]);

            Category::whereIn('id', $ids->all())->delete();
        });
    }
}
