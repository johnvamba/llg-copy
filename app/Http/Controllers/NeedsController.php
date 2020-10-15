<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Requests\NeedsStoreRequest;
use App\Http\Requests\NeedsUpdateRequest;
use Illuminate\Http\Request;
use App\Organization;
use App\NeedsCategory;
use App\NeedHasCategory;
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
    public function index(Request $request, $page = 1)
    {
        $filters = $request->filters;

        $needHasCategories = [];

        $needs = Need::with([
                'organization',
                'type', 
                'categories',
                'categories.model'
            ]);

        if (!empty($filters)){
            $needs->where('needs_type_id', $filters['type']);
            
            if ($filters['filterAmount']) 
                $needs->where('goal', '<=', floatval($filters['amount']));

            if(count($filters['category']) > 0){
                $needHasCategories = NeedHasCategory::where('model_type', 'App\NeedsCategory')
                    ->whereIn('model_id', $filters['category'])
                    ->pluck('need_id');
                $needs->whereIn('id', $needHasCategories);
            }
        }
        
        $results = $needs->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'needs', $page);

        foreach ($results as $need) {
            $need->model;
            $need->getMedia('photo');
            $need['photo'] = $need->organization->getMedia('photo');
            $need['cover_photo'] = $need->organization->getMedia('cover_photo');

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

        return response()->json($results);
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
    public function getOrganizationNeeds(Request $request, Organization $organization)
    {
        $needs = Need::with('type')
            ->where('organization_id', $organization->id);

        switch($request->type) {
            case 'active':
                $needs->whereRaw('raised < goal');
                break;
            case 'past':
                $needs->whereRaw('raised >= goal');
                break;
            default:
                break;
        }
    
        $results = $needs->get();
    
        return response()->json($results);
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
            ->with(['organization', 'categories', 'categories.model', 'type'])
            ->selectRaw('( 6371 * acos( cos( radians(?) ) 
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

        $results = $needs->orderBy('distance')->get();

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

                $category = $request->category ?:
                                NeedsCategory::all()->pluck('name');

                $need = Need::create(
                    array_merge(
                        request()->only([
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

                $need->short_description = $request->description;
                $need->save();

                if ($request->category) {
                    foreach($request->category as $value) {
                        $fetchCategory = NeedsCategory::find($value);

                        $hasCategory = NeedHasCategory::make([
                                'need_id' => $need->id
                            ]);
                            
                        $fetchCategory->category()->save($hasCategory);
                    }
                }

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
        $need = Need::with('type')->where('id', $need->id)->first();
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
        $need->update($request->only([
                'title',
                'description',
                'location',
                'raised',
                'goal',
            ]));

        if (gettype($request->category) === 'array') {
            $need->categories()->delete();
            
            foreach($request->category as $value) {
                $hasCategory = NeedHasCategory::make([
                        'needs_category_id' => $value
                    ]);
                    
                $need->categories()->save($hasCategory);
            }
        }

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
