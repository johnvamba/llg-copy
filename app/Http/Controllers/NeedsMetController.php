<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Group;
use App\Need;
use App\NeedMet;
use App\GroupParticipant;
use DB;

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

    /**
     * Display user needs met.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserNeedsMet(Request $request)
    {
        $needsMet = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) {
                    $query->where('model_id', auth()->user()->id);
                }
            )->pluck('need_id');

        $needs = Need::with('type', 'categories', 'contribution')
            ->whereIn('id', $needsMet)
            ->get();

        foreach($needs as $need) {
            $need->getMedia();
            $need['photo'] = $need->getFirstMediaUrl('photo');
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
        $users = GroupParticipant::where('group_id', $group->id)->pluck('user_id');
        
        $needsMet = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) use ($users) {
                    $query->whereIn('model_id', $users);
                }
            )->pluck('need_id');

        $needs = Need::with(['type', 'categories', 
            'contribution' => function ($query) {
                $query->whereHasMorph(
                    'model',
                    ['App\User'],
                    function ($q) {
                        $q->where('model_id', auth()->user()->id);
                    }
                );
            }])
            ->whereIn('id', $needsMet)
            ->get();

        foreach($needs as $need) {
            $need->getMedia();
            $need['photo'] = $need->getFirstMediaUrl('photo');
        }

        return response()->json($needs);
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
