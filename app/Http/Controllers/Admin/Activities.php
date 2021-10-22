<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Activity;

use App\Http\Resources\Mini\ActivityResource;

class Activities extends Controller
{
    public function __invoke(Request $request) {
        $date = Carbon::now();

        $today = Activity::with('user', 'user.profile', 'model')
            ->has('model')
            ->whereDate('created_at', $date)
            ->latest();

        $yesterday = Activity::with('user', 'user.profile', 'model')
            ->has('model')
            ->whereDate('created_at', (clone $date)->subDay())
            ->latest();
        // dd($date, (clone $date)->subDay());

        return response()
			->json([
				'today' => ActivityResource::collection($today->paginate(20)),
				'yesterday' => ActivityResource::collection($yesterday->paginate(20))
			]);
    }
}
