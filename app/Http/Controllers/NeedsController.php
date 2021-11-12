<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use App\Http\Requests\NeedsStoreRequest;
use App\Http\Requests\NeedsUpdateRequest;
use Illuminate\Http\Request;
use App\Jobs\Mail\NeedMetMailer;
use App\Organization;
use App\NeedsCategory;
use App\Categorizes;
// use App\NeedHasCategory;
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
    public function index(Request $request, $page)
    {
        $filters = $request->filters;

        $needIds = [];

        if (!empty($filters)){
            if(count($filters['category']) > 0) {
                $needIds = Categorizes::whereHasMorph(
                        'categorize',
                        ['App\Need'],
                        function() {}
                    )
                    ->whereIn('category_id', $filters['category'])
                    ->groupBy('categorize_id')
                    ->pluck('categorize_id');
            }
        }

        $needs = Need::with([
                'organization',
                'organization.credential',
                'type', 
                'categories',
            ])
            ->whereHas(
                'organization',
                function(Builder $query) {
                    $query->withTrashed(false);
                }
            );

        if (!empty($filters)) {
            if (array_key_exists('type', $filters) && count($filters['type']) > 0) {
                $needs->whereIn('needs_type_id', $filters['type'])
                    ->orWhereIn('id', $needIds);
            }
            
            if (array_key_exists('filterAmount',$filters) && $filters['filterAmount']) {
                $needs->where('goal', '<=', floatval($filters['amount']));
            }
        }
        
        $results = $needs
            ->where(function($query) {
                $query->whereNotNull('approved_by')
                    ->whereRaw('raised < goal');
            })
            ->inRandomOrder()
            ->paginate(10, ['*'], 'needs', $page);

        foreach ($results as $need) {
            $need->model;
            $need->getMedia('photo');

            $need->categories = $need->categoriesList; //reset?

            if ($need->organization) {
                $need['photo'] = $need->organization->getFirstMediaUrl('photo');
            }

            $need['cover_photo'] = $need->getFirstMediaUrl('photo');
            
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
        $needs = Need::whereRaw('raised < goal')->whereNotNull('approved_at')->count();

        return response()->json($needs);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOrganizationNeeds(Request $request, Organization $organization, $page = 1)
    {
        $needs = Need::with(
                'type', 
                'categories',
                'organization',
                'organization.credential'
            )
            ->where('organization_id', $organization->id);

        switch($request->type) {
            case 'active':
                $needs->whereNotNull('approved_by')
                    ->whereRaw('raised < goal');
                break;
            case 'past':
                $needs->whereNotNull('approved_by')
                    ->whereRaw('raised >= goal');
                break;
            default:
                break;
        }
    
        $results = $needs->paginate(10, ['*'], 'organization_needs', $page);

        foreach ($results as $need) {
            $need->model;
            $need->getMedia('photo');

            $need->categories = $need->categoriesList; //reset?

            $need['photo'] = $need->organization->getFirstMediaUrl('photo');
            $need['cover_photo'] = $need->getFirstMediaUrl('photo');

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
                    //assuming that request->category are array of ids from categories. then just sync. we dont need to query each one if existed.
                    $need->categories()->sync($request->category);
                    
                    //$need->categoriesList()->sync($request->category); -> undefined method categoriesList()
                    
                    // foreach($request->category as $value) {
                    //     $fetchCategory = NeedsCategory::find($value);

                    //     $hasCategory = NeedHasCategory::make([
                    //             'need_id' => $need->id
                    //         ]);
                            
                    //     $fetchCategory->category()->save($hasCategory);
                    // }
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
     * Volunteer to needs
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addVolunteer(Request $request, Need $need)
    {
        $result = DB::transaction(function () use ($request, $need) {
            $nm = NeedMet::make([
                'need_id' => $need->id,
                'amount' => $request->amount,
            ]);

            auth()->user()->needsMet()->save($nm);

            if($nm->wasRecentlyCreated){
                $need->update([
                        'raised' => ($need->raised + 1)
                    ]);
            }
            
            dispatch(new NeedMetMailer($need, auth()->user(), 1));

            return $nm;
        });

        return response()->json($result);
    }
    
    /**
     * Cancel volunteering to needs
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function cancelVolunteer(Request $request, Need $need)
    {
        try {
            $nm = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function (Builder $query) {
                    $query->where('model_id', auth()->user()->id);
                }
            )
            ->where('need_id', $need->id)
            ->delete();

            return response()->json([
                'message' => 'Successfully cancelled.'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Need $need)
    {
        $result = Need::with([
                'organization',
                'organization.credential',
                'type', 
                'categories',
            ])
            ->where('id', $need->id)
            ->first();

        $result->model;
        $result->getMedia('photo');

        $result->categories = $result->categoriesList; //reset?

        $result['photo'] = $result->organization->getFirstMediaUrl('photo');
        $result['cover_photo'] = $result->getFirstMediaUrl('photo');
        
        $result['totalActiveNeeds'] = Need::where(
                'organization_id', $result->organization_id
            )
            ->whereRaw('raised < goal')
            ->count();
        
        $result['totalPastNeeds'] = Need::where(
                'organization_id', $result->organization_id
            )
            ->whereRaw('raised >= goal')
            ->count();

        return response()->json($result);
        
        // $need = Need::with('type')->where('id', $need->id)->first();
        // $need->model;
        // $need->getMedia('photo');

        // return response()->json($need);
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
            //Same as above but we don't need to categories()->delete(); might be a smart way but this actually delete the relationship instances meaning if the categories() are direct instance of categories table then those categories are deleted instead. do sync instead.
            $need->categoriesList()->sync($request->category);
            // $need->categories()->delete();
            // foreach($request->category as $value) {
            //     $hasCategory = NeedHasCategory::make([
            //             'needs_category_id' => $value
            //         ]);
                    
            //     $need->categories()->save($hasCategory);
            // }
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
