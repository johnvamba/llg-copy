<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Requests\NeedsStoreRequest;
use App\Http\Requests\NeedsUpdateRequest;
use Illuminate\Http\Request;
use App\Organization;
use App\Need;
use App\NeedMet;
use App\Tag;
use DB;

class NeedsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $needs = Need::with('category', 'type')
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($needs as $need) {
            $need->model;
            $need->getMedia('photo');
        }

        return response()->json($needs);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTotalNeedsOpen(Request $request)
    {
        //
        $needs = Need::whereRaw('raised < goal')->count();

        return response()->json($needs);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getNeeds(Request $request)
    {
        //
        $results['columns'] = [
                'id',
                'title',
                'description',
                'location',
                'raised',
                'goal',
            ];

        $needs = Need::orderBy('created_at', 'desc')
            ->get()
            ->map->only(
                'id', 
                'title', 
                'description', 
                'location', 
                'raised',
                'goal'
            )
            ->chunk($request->limit);

        $results['data'] = $needs;
        $results['module'] = [
                'path' => '/needs',
                'endpoint' => 'needs',
                'singular' => 'need',
                'plural' => 'needs',
            ];

        return response()->json($results);
    }

    /**
     * Display a listing of the resource nearby.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRecentAdded(Request $request)
    {
        $needs = Need::with('type')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        foreach($needs as $need) {
            $need->getMedia('photo');
        }

        return response()->json($needs);
    }

    /**
     * Display a listing of the resource nearby.
     *
     * @return \Illuminate\Http\Response
     */
    public function nearby(Request $request, $lat, $lng)
    {
        $tags = [];

        if ($request->tags) {
            $tags = Tag::where('model_type', 'App\Need')
                ->whereIn('name', json_decode($request->tags))
                ->groupBy('model_id')
                ->pluck('model_id');
        }

        $needs = Need::select('needs.*')
            ->with(['category', 'type'])
            ->selectRaw('( 6367 * acos( cos( radians(?) ) 
                * cos( radians( lat ) ) * cos( radians( lng ) 
                - radians(?) ) + sin( radians(?) ) 
                * sin( radians( lat ) ) ) ) AS distance', 
                [$lat, $lng, $lat]);

        if ($request->type)
            $needs->where('needs_type_id', $request->type);

        if ($request->amount)
            $needs->where('raised', '<=', $request->amount);

        if ($tags)
            $needs->whereIn('id', $tags);

        $results = $needs->orderBy('distance')->paginate();

        foreach($results as $result) {
            $result->model;
            $result->getMedia('photo');
        } 
            
        return response()->json($results, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NeedsStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $org = Organization::find($request->organization);

                $need = Need::create(
                    array_merge(
                        request()->only([
                            'needs_category_id',
                            'needs_type_id',
                            'title',
                            'description',
                            'location',
                            'lat',
                            'lng',
                            'raised',
                            'goal'
                        ]),
                        ["organization_id" => $org->id]
                    )
                );

                if ($request->tags) {
                    $tags = Tag::createTag($need, $request->tags);
                    $need['tags'] = $tags;
                }

                if ($request->get('photo')) {
                    $image = $request->get('photo');
                    $name = time().'-'.Str::random(20);
                    $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                    
                    $need 
                        ->addMediaFromBase64($image)
                        ->usingName($name)
                        ->usingFileName($name.'.'.$extension)
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                    $need->getMedia('photo');
                }

                return $need;
            });

        return response()->json($result, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Need $need)
    {
        $need = Need::with('category', 'type')->where('id', $need->id)->first();
        $need->model;
        $need->getMedia('photo');

        return response()->json($need);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NeedsUpdateRequest $request, Need $need)
    {
        $need->update($request->validated());
        return response()->json($need, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Need $need)
    {
        try {
            $need->delete();
            
            return response()->json([
                    'message' => 'Needs successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
