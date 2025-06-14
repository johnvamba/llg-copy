<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\User;
use App\Group;
use App\Goal;
use App\Need;
use App\NeedMet;
use App\GroupParticipant;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class NeedsMetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $needsMet = NeedMet::with('need')
            ->where('user_id', auth()->user()->id)
            ->get();

        return response()->json($needsMet);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTotalNeedsMet()
    {
        $needsMet = NeedMet::count();

        return response()->json($needsMet);
    }

    public function getNeedMets(Request $request)
    {
        $needsMet = NeedMet::with(
            'need', 
            'need.type', 
            'need.categories', 
            'need.contribution'
        )
        ->whereHasMorph(
            'model',
            ['App\User'],
            function ($query) {
                $query->where('model_id', auth()->user()->id);
            }
        )
        ->latest()
        ->get();

        return response()->json($needsMet);
        
        // $goal = Goal::whereHasMorph(
        //     'model',
        //     ['App\User'],
        //     function (Builder $query) {
        //         $query->where('model_id', auth()->user()->id);
        //     }
        // )
        // ->where('status', 'in progress')
        // ->latest()
        // ->first();

        // if (!$goal) {
        //     return response()->json([
        //         'message' => "You have not set your goal yet."
        //     ]);
        // }

        // $date = Carbon::parse($goal->created_at);

        // $endDate = $goal->term == 'year' 
        //     ? $date->copy()->endOfYear()->toDateString()
        //     : $date->copy()->endOfMonth()->toDateString();
        
        // $needsMet = NeedMet::with(
        //         'need', 
        //         'need.type', 
        //         'need.categories', 
        //         'need.contribution'
        //     )
        //     ->whereHasMorph(
        //         'model',
        //         ['App\User'],
        //         function ($query) {
        //             $query->where('model_id', auth()->user()->id);
        //         }
        //     )
        //     ->whereBetween('created_at', [
        //         $date->copy()->toDateString(),
        //         $endDate
        //     ])
        //     ->latest()
        //     ->get();

        // return response()->json($needsMet);
    }

    /**
     * Display user needs met.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserNeedsMet(Request $request, User $user)
    {
        $goal = Goal::whereHasMorph(
                'model',
                ['App\User'],
                function (Builder $query) use ($user) {
                    $query->where('model_id', $user->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        if (!$goal) {
            return response()->json([
                'message' => "You have not set your goal yet."
            ]);
        }

        $date = Carbon::parse($goal->created_at);

        $dateEnded = $goal->term == 'year' 
            ? $date->copy()->endOfYear()->toDateString()
            : $date->copy()->endOfMonth()->toDateString();

        $needsMet = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) use ($user) {
                    $query->where('model_id', $user->id);
                }
            )
            ->whereBetween('created_at', [
                $date->copy()->toDateString(),
                $dateEnded
            ])
            ->pluck('need_id');

        $needs = Need::with('type', 'categories', 'contribution')
            ->whereIn('id', $needsMet)
            ->get();

        foreach ($needs as $need) {
            $need->model;
            $need->getMedia('photo');

            $need->categories = $need->categoriesList; //reset?

            $need['photo'] = $need->organization->getFirstMediaUrl('photo');
            $need['cover_photo'] = $need->organization->getFirstMediaUrl('cover_photo');

            $need['totalActiveNeeds'] = Need::where(
                    'organization_id', $need->organization_id
                )
                ->whereRaw('raised < goal')
                ->count();
            
            $need['totalPastNeeds'] = Need::where(
                    'organization_id', $need->organization_id
                )
                ->whereRaw('raised >= goal')
                ->count();
        }

        return response()->json($needs);
    }
    
    /**
     * Display group user needs met.
     *
     * @return \Illuminate\Http\Response
     */
    public function getGroupNeedsMet(Request $request, Group $group)
    {
        $date;

        $users = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved']
            ])->pluck('user_id');

        $users->push($group->user_id);

        $goal = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function (Builder $query) use ($group) {
                    $query->where('model_id', $group->id);
                }
            )
            ->where('status', 'in progress')
            ->where('reset', false)
            ->latest()
            ->first();

        $needsMet = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) use ($users) {
                    $query->whereIn('model_id', $users);
                }
            );

        if ($goal) {
            $date = Carbon::parse($group->created_at);
            
            $needsMet = $needsMet->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString()
                ]);
        }

        $needsMet = $needsMet->pluck('need_id');

        $needs = Need::with('type', 'categories');

        // if ($request->user) {
        //     $needs = $needs->with(['contribution' => whereHasMorph(
        //         'model',
        //         ['App\User'],
        //         function ($q) {
        //             $q->where('model_id', $request->user);
        //         }
        //     )]);
        // }

        $needs = $needs->whereIn('id', $needsMet)->get();

        foreach ($needs as $need) {
            $need->model;
            $need->getMedia('photo');

            $need->categories = $need->categoriesList; //reset?

            $need['photo'] = $need->organization->getFirstMediaUrl('photo');
            $need['cover_photo'] = $need->organization->getFirstMediaUrl('cover_photo');

            $need['totalActiveNeeds'] = Need::where(
                    'organization_id', $need->organization_id
                )
                ->whereRaw('raised < goal')
                ->count();
            
            $need['totalPastNeeds'] = Need::where(
                    'organization_id', $need->organization_id
                )
                ->whereRaw('raised >= goal')
                ->count();
        }

        return response()->json($needs);

        // $date;

        // $users = GroupParticipant::where([
        //         ['group_id', $group->id],
        //         ['status', 'approved']
        //     ])->pluck('user_id');

        // $users->push($group->user_id);

        // $goal = Goal::whereHasMorph(
        //         'model',
        //         ['App\Group'],
        //         function (Builder $query) use ($group) {
        //             $query->where('model_id', $group->id);
        //         }
        //     )
        //     ->where('status', 'in progress')
        //     ->latest()
        //     ->first();

        // if ($group['goal']) {
        //     $date = Carbon::parse($group->created_at);
        // } else {
        //     $date = Carbon::parse($group->created_at);
        // }

        // $needsMet = NeedMet::whereHasMorph(
        //         'model',
        //         ['App\User'],
        //         function ($query) use ($users) {
        //             $query->whereIn('model_id', $users);
        //         }
        //     )
        //     ->whereBetween('created_at', [
        //         $date->copy()->toDateString(),
        //         $date->copy()->endOfMonth()->toDateString()
        //     ])
        //     ->pluck('need_id');

        // $needs = Need::with(['type', 'categories', 
        //     'contribution' => function ($query) {
        //         $query->whereHasMorph(
        //             'model',
        //             ['App\User'],
        //             function ($q) {
        //                 $q->where('model_id', auth()->user()->id);
        //             }
        //         );
        //     }])
        //     ->whereIn('id', $needsMet)
        //     ->get();

        // foreach ($needs as $need) {
        //     $need->model;
        //     $need->getMedia('photo');

        //     $need->categories = $need->categoriesList; //reset?

        //     $need['photo'] = $need->organization->getFirstMediaUrl('photo');
        //     $need['cover_photo'] = $need->organization->getFirstMediaUrl('cover_photo');

        //     $need['totalActiveNeeds'] = Need::where(
        //             'organization_id', $need->organization_id
        //         )
        //         ->whereRaw('raised < goal')
        //         ->count();
            
        //     $need['totalPastNeeds'] = Need::where(
        //             'organization_id', $need->organization_id
        //         )
        //         ->whereRaw('raised >= goal')
        //         ->count();
        // }

        // return response()->json($needs);
    }

    /**
     * Display user needs met.
     *
     * @return \Illuminate\Http\Response
     */
    public function getNeedsVolunteer(Request $request, Need $need)
    {
        $needsMets['volunteered'] = false;

        $needsMets['volunteers'] = NeedMet::where('need_id', $need->id)
            ->get();

        foreach($needsMets['volunteers'] as $met) {
            if (auth()->check()) {
                if ($met->model->profile->user_id == auth()->user()->id) 
                    $needsMets['volunteered'] = true;
            }
            $met->model->profile;
        }

        return response()->json($needsMets);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $makeNeedMet = NeedMet::make([
                'need_id' => $request->need_id,
                'amount' => $request->amount,
            ]);

        $needMet= auth()->user()->needsMet()->save($makeNeedMet);

        return response()->json($needMet, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
