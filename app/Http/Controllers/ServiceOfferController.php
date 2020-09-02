<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceOfferStoreRequest;
use App\Http\Requests\ServiceOfferUpdateRequest;
use Illuminate\Http\Request;
use App\Tag;
use App\Content;
use App\ServiceOffer;
use DB;

class ServiceOfferController extends Controller
{
    /**
     * Display a listing of the resource with media.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contents = Content::with('serviceOffer')
                ->where('type', 'service')
                ->paginate();
        
        foreach ($contents as $content) {
            $content->getMedia('feature_photo');
        }

        return response()->json($contents, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceOfferStoreRequest $request)
    {
        //
        $result = DB::transaction(function () use ($request) {
            $content = Content::createContent($request);

            if ($request->tags) {
                $tags = Tag::createTag($content, $request->tags);
                $content['tags'] = $tags;
            }

            if ($request->hasFile('media')) {
                $content
                    ->addMedia($request->file('media'))
                    ->toMediaCollection('feature_photo', env('FILESYSTEM_DRIVER'));
                $content->getMedia('feature_photo');
            }
            
            $service = ServiceOffer::createdServiceOffer($request, $content->id);
            
            $content['service'] = $service;

            return $content;
        });

        return response()->json([
                'message' => 'Successfully created.',
                'data' => $result
            ], 202);
    }

    /**
     * Display the specified resource with media.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $content = Content::with('serviceOffer')
            ->where('id', $id)
            ->first();

        $content->getMedia('feature_photo');

        return response()->json($content, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ServiceOfferUpdateRequest $request, $id)
    {
        $content = Content::findOrFail($id);
        $content->update(
                request()->only([
                    'title',
                    'description',
                    'type',
                    'status'
                ])
            );

        $serviceOffer = ServiceOffer::where('content_id', $content->id)->first();
        $serviceOffer->update(request()->only([
                'service_type_id',
                'location',
                'lat',
                'lng',
            ]));

        $content['service'] = $serviceOffer;

        return response()->json($content, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Content $content)
    {
        //
        try {
            $content->delete();
            
            return response()->json([
                    'message' => 'Service Offer successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
