<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Requests\OrganizationStoreRequest;
use Illuminate\Http\Request;
use App\Organization;
use App\OrganizationCredential;
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
        $orgs = Organization::orderBy('created_at', 'desc')->paginate();

        foreach ($orgs as $org) {
            $org->getMedia('photo');
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrganizationStoreRequest $request)
    {
        //
        $result = DB::transaction(function () use ($request) {
                $org = Organization::create(request()->only([
                        'name',
                        'description',
                        'location',
                        'lat',
                        'lng'
                    ]));

                if ($request->hasFile('media')) {
                    $org
                        ->addMedia($request->file('media'))
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                    $org->getMedia('photo');
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
        $org->update($request->validated());

        return response()->json($org, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $org = Organization::findOrFail($id);
            $org->delete();
            
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
