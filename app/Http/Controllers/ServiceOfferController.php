<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceOfferStoreRequest;
use Illuminate\Http\Request;
use App\Tag;
use App\Content;
use App\ServiceOffer;
use DB;

class ServiceOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contents = Content::with('serviceOffer')
                ->where('type', 'service')
                ->paginate();

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
            $service = ServiceOffer::createdServiceOffer($request, $content->id);

            if ($request->tags) {
                $tags = Tag::createTag($content, $request->tags);
                $content['tags'] = $tags;
            }

            $content['service'] = $service;

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
        //
        $result = Content::with('serviceOffer')
            ->where('id', $id)
            ->first();

        return response()->json($result, 200);
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
