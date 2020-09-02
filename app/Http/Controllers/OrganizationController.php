<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationStoreRequest;
use App\Http\Requests\NeedsMetStoreRequest;
use App\Http\Requests\CommunityStoreRequest;
use Illuminate\Http\Request;
use App\CommunityContent;
use App\Community;
use App\Content;
use App\NeedsMet;
use App\Tag;
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
        $organizations = Community::with(['contents','contents.details'])
            ->where('type', 'organization')
            ->paginate();

        return response()->json($organizations, 200);
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
                $organization = Community::create(
                    array_merge(
                        request()->only([
                            'name',
                            'description',
                            'location',
                            'lat',
                            'lng'
                        ]),
                        ['type' => 'organization']
                    )
                );

                if ($request->hasFile('media')) {
                    $organization
                        ->addMedia($request->file('media'))
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));
                    
                    $organization->getMedia('photo');
                }

                return $organization;
            });

        return response()->json([
            'message' => 'Successfully created.',
            'data' => $result
        ], 202);
    }

    /**
     * Create orgs needs met
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function createNeedsMet(NeedsMetStoreRequest $request, $id)
    {
        $result = DB::transaction(function () use ($request, $id) {
                $content = Content::createContent($request);
                $needsmet = NeedsMet::createNeedsMet($request, $content->id);

                if ($request->tags) {
                    $tags = Tag::createTag($content, $request->tags);
                    $content['tags'] = $tags;
                }

                $community = CommunityContent::create([
                        'community_id' => $id,
                        'content_id' => $content->id
                    ]);

                $content['community'] = $community;
                $content['needs_met'] = $needsmet;

                return $content;
            });

        return response()->json([
                'message' => 'Successfully created.',
                'data' => $result
            ], 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $organization = Community::with(['contents','contents.details'])
            ->where('id', $id)
            ->first();

        return response()->json($organization, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommunityStoreRequest $request, $id)
    {
        //
        $community = Community::findOrFail($id);
        $community->update(
                request()->only([
                    'name',
                    'description',
                    'location',
                    'lat',
                    'lng',
                    'type'
                ])
            );

        return response()->json($community, 202);
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
