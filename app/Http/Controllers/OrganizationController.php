<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Requests\OrganizationStoreRequest;
use Illuminate\Http\Request;
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
    public function index()
    {
        $orgs = Organization::orderBy('created_at', 'desc')->get();

        foreach ($orgs as $org) {
            $org->getMedia('photo');
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
        $results['columns'] = ['id', 'name', 'description', 'location'];

        $orgs = Organization::orderBy('created_at', 'desc')
            ->get()
            ->map->only('id', 'name', 'description', 'location')
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
        $orgs = Organization::select('organizations.*')
            ->selectRaw('( 6367 * acos( cos( radians(?) ) 
                * cos( radians( lat ) ) * cos( radians( lng ) 
                - radians(?) ) + sin( radians(?) ) 
                * sin( radians( lat ) ) ) ) AS distance', 
                [$lat, $lng, $lat]);

        $results = $orgs->orderBy('distance')->get();

        foreach($results as $result) {
            $result->getMedia();
        } 
            
        return response()->json($results, 200);
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
                        'description',
                        'location',
                        'lat',
                        'lng'
                    ]));

                if ($request->category) {
                    foreach($request->category as $value) {
                        $hasCategory = OrganizationHasCategory::make([
                                'organization_category_id' => $value
                            ]);
                            
                        $org->categories()->save($hasCategory);
                    }
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
        $org = Organization::findOrFail($id);
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
    public function update(OrganizationUpdateRequest $request, $id)
    {
        $org = Organization::findOrFail($id);

        $org->update(request()->except([
            'category',
            'needs',
            'secretKey', 
            'publishableKey',
            'created_at',
            'updated_at',
            'deleted_at'
        ]));
        
        if (gettype($request->category) === 'array') {
            $org->categories()->delete();

            foreach($request->category as $value) {
                $hasCategory = OrganizationHasCategory::make([
                        'organization_category_id' => $value
                    ]);

                $org->categories()->save($hasCategory);
            }
        }

        if ($request->secretKey && $request->publishableKey) {
            $credential = OrganizationCredential::where(
                    'organization_id', $org->id
                )
                ->first();
    
            if (!$credential) {
                $credential = new OrganizationCredential;
            }
            
            $credential->organization_id = $org->id;
            $credential->secret_key = $request->secretKey;
            $credential->publishable_key = $request->publishableKey;
            $credential->save();
        }
        
        return response()->json($org, 202);
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
