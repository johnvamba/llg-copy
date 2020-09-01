<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryStoreRequest;
use Illuminate\Http\Request;
use App\Content;
use App\Tag;
use DB;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stories = Content::where('type', 'story')->paginate();

        foreach ($stories as $story) {
            $story->getMedia('photo');
        }

        return response()->json($stories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoryStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
            $content = Content::createContent($request);

            if ($request->tags) {
                $tags = Tag::createTag($content, $request->tags);
                $content['tags'] = $tags;
            }

            if ($request->hasFile('media')) {
                $content
                    ->addMedia($request->file('media'))
                    ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));
            }
            
            $content->getMedia('photo');

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
        $content = Content::find($id);
        $content->getMedia('photo');

        return response()->json($content, 200);
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
        try {
            Content::find($id)->delete();
            
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
