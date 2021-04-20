<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Requests\OrganizationStoreRequest;
use Illuminate\Http\Request;
use App\Need;
use App\Group;
use App\Organization;
use App\OrganizationCredential;
use App\OrganizationHasCategory;
use DB;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $page = 1)
    {
        $orgs = Organization::orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'stories', $page);

        foreach ($orgs as $org) {
            $org['photo'] = $org->getFirstMediaUrl('photo');
            $org['cover_photo'] = $org->getFirstMediaUrl('banner');
                
            $org['activeNeeds'] = Need::where('organization_id', $org->id)
                ->whereNotNull('approved_by')
                ->whereRaw('raised < goal')
                ->count();

            $org['pastNeeds'] = Need::where('organization_id', $org->id)
                ->whereNotNull('approved_by')
                ->whereRaw('raised >= goal')
                ->count();
        }

        return response()->json($orgs);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOrganizations(Request $request)
    {
        $results['columns'] = ['id', 'name', 'email', 'site', 'description', 'location'];

        $orgs = Organization::orderBy('created_at', 'desc')
            ->get()
            ->map->only('id', 'name', 'email', 'site', 'description', 'location')
            ->chunk($request->limit);

        $results['data'] = $orgs;
        $results['module'] = [
                'path' => '/organizations',
                'singular' => 'organisation',
                'plural' => 'organisations',
                'endpoint' => 'organizations' 
            ];

        return response()->json($results);
    }

    /**
     * Get featured organizations
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getFeaturedOrganizations(Request $request)
    {
        $orgs = Organization::where('featured', true)
            ->latest()
            ->get();

        foreach ($orgs as $org) {
            $org['photo'] = $org->getFirstMediaUrl('photo');
            $org['cover_photo'] = $org->getFirstMediaUrl('banner');
                
            $org['activeNeeds'] = Need::where('organization_id', $org->id)
                ->whereNotNull('approved_by')
                ->whereRaw('raised < goal')
                ->count();

            $org['pastNeeds'] = Need::where('organization_id', $org->id)
                ->whereNotNull('approved_by')
                ->whereRaw('raised >= goal')
                ->count();
        }

        return response()->json($orgs);
    }
    
    /**
     * Get organization credential
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCredential(Request $request, Organization $organization)
    {
        $credential = OrganizationCredential::find($organization->id);

        return response()->json($credential);
    }

    /**
     * Display a listing of the resource nearby.
     *
     * @return \Illuminate\Http\Response
     */
    public function nearby(Request $request, $lat, $lng)
    {
        \DB::enableQueryLog();
        $collections = collect();

        $fetchOrgs = Organization::select('organizations.*')
            ->selectRaw('( 6371 * acos( cos( radians(?) ) 
                * cos( radians( lat ) ) * cos( radians( lng ) 
                - radians(?) ) + sin( radians(?) ) 
                * sin( radians( lat ) ) ) ) AS distance', 
                [$lat, $lng, $lat]);

        if ($request->filter) {
            $fetchOrgs->whereHas('categories', function($query) use ($request) {
                $query->whereIn('categories.id', $request->filter);
            })->with('categories');
        }

        $orgs = $fetchOrgs->orderBy('distance')->get();

        foreach($orgs as $org) {
            $org['type'] = 'organisation';
            $org['photo'] = $org->getFirstMediaUrl('photo');
            $org['cover_photo'] = $org->getFirstMediaUrl('banner');
        } 

        $groups = Group::select('groups.*')
            ->selectRaw('( 6371 * acos( cos( radians(?) ) 
                * cos( radians( lat ) ) * cos( radians( lng ) 
                - radians(?) ) + sin( radians(?) ) 
                * sin( radians( lat ) ) ) ) AS distance', 
                [$lat, $lng, $lat])
            ->orderBy('distance')->get();
        
        foreach($groups as $group) {
            $group['type'] = 'church';
            $group['photo'] = $group->getFirstMediaUrl('photo');
        } 

        $merged = $collections->merge($orgs)->merge($groups);

        $results = $merged->sortBy('distance');

        return response()->json($results->toArray(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrganizationStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $categories = $request->category ?:
                                OrganizationCategory::all()->pluck('name');

                $org = Organization::create(request()->only([
                        'name',
                        'email',
                        'phone_number',
                        'site',
                        'description',
                        'location',
                        'lat',
                        'lng'
                    ]));

                $org->short_description = $request->description;
                $org->save();

                if ($request->category) {
                    // Check 
                    $org->categories()->sync($request->category);
                    // foreach($request->category as $value) {
                    //     $hasCategory = OrganizationHasCategory::make([
                    //             'organization_category_id' => $value
                    //         ]);
                            
                    //     $org->categories()->save($hasCategory);
                    // }
                }

                if ($request->secretKey && $request->publishableKey) {
                    OrganizationCredential::create([
                        'organization_id' => $org->id,
                        'secret_key' => $request->secretKey,
                        'publishable_key' => $request->publishableKey,
                    ]);
                }

                if ($request->get('photo')) {
                    $image = $request->get('photo');
                    $name = time().'-'.Str::random(40);
                    $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                    
                    $org 
                        ->addMediaFromBase64($image)
                        ->usingName($name)
                        ->usingFileName($name.'.'.$extension)
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                    $org->getMedia('photo');
                }

                if ($request->get('cover_photo')) {
                    $image = $request->get('cover_photo');
                    $name = time().'-'.Str::random(40);
                    $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                    
                    $org 
                        ->addMediaFromBase64($image)
                        ->usingName($name)
                        ->usingFileName($name.'.'.$extension)
                        ->toMediaCollection('cover_photo', env('FILESYSTEM_DRIVER'));
                    
                    $org->getMedia('cover_photo');
                }

                return $org;
            });

        return response()->json($result, 202);
    }

    /**
     * Add organization stripe credential
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addCredential(Request $request, Organization $organization)
    {
        $credential = OrganizationCredential::create(
                array_merge(
                    request()->only([
                        'secret_key',
                        'publishable_key'
                    ]),
                    ['organization_id' => $organization->id]
                )
            );

        return response()->json($credential, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $org = Organization::with('categories', 'categories')
            ->where('id', $id)
            ->first();

        $org->getMedia('photo');

        return response()->json($org);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrganizationUpdateRequest $request, Organization $organization)
    {
        $organization->update(request()->except([
            'category',
            'categories',
            'needs',
            'secretKey', 
            'publishableKey',
            'created_at',
            'updated_at',
            'deleted_at'
            ]));
            
        if (gettype($request->category) === 'array') {

            $organization->categories()->sync($request->category);

            // $organization->categories()->delete();
            // foreach($request->category as $value) {
            //     $hasCategory = OrganizationHasCategory::make([
            //             'organization_category_id' => $value
            //         ]);

            //     $organization->categories()->save($hasCategory);
            // }
        }

        if ($request->secretKey && $request->publishableKey) {
            $credential = OrganizationCredential::where(
                    'organization_id', $organization->id
                )
                ->first();
    
            if (!$credential) {
                $credential = new OrganizationCredential;
            }
            
            $credential->organization_id = $organization->id;
            $credential->secret_key = $request->secretKey;
            $credential->publishable_key = $request->publishableKey;
            $credential->save();
        }

        return response()->json($organization, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        try {
            if($user = auth()->user()){
                if($user->hasRole('organization admin') && session('org_id') == $organization->id)
                    throw new \Exception("Deleting controlled organization is rejected");
            }

            $organization->delete();
            
            return response()->json([
                    'message' => 'Organization successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
