<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeaturedStoryStoreRequest;
use App\Http\Requests\CommentStoryStoreRequest;
use App\Http\Requests\StoryStoreRequest;
use App\Http\Requests\StoryUpdateRequest;
use Illuminate\Http\Request;
use App\Content;
use App\Tag;
use App\AppreciateStory;
use App\CommentStory;
use App\FeaturedStory;
use Carbon\Carbon;
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
        $stories = Content::with(['appreciates', 'comments'])
            ->where('type', 'story')
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($stories as $story) {
            $story->getMedia('photo');
        }

        return response()->json($stories, 200);
    }

    /**
     * Display featured stories
     *
     * @return \Illuminate\Http\Response
     */
    public function featuredStory(Request $request)
    {
        $stories = FeaturedStory::with('contents')
            ->where([
                ['start_date', '>=', Carbon::now()->toDateString()],
                ['end_date', '<=', Carbon::now()->toDateString()]
            ])
            ->inRandomOrder()
            ->first();

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
     * Featured a story
     * 
     * @param request
     * @return \Illuminate\Http\Response
    */
    public function addFeaturedStory(FeaturedStoryStoreRequest $request, Content $content)
    {
        $featuredStory = FeaturedStory::create(
                array_merge(
                    request()->only([
                        'start_date',
                        'end_date'
                    ]),
                    ["content_id" => $content->id]
                )
            );
        
        return response()->json($featuredStory, 202);
    }

    /**
     * Appreciation of story
     *
     * @param content
     * @return \Illuminate\Http\Response
     */
    public function appreciate(Content $content)
    {
        $result = AppreciateStory::create([
                'content_id' => $content->id,
                'user_id' => auth()->user()->id
            ]);

        return response()->json([
                'message' => 'Success'
            ], 202);
    }

    /**
     * Comment to story
     *
     * @param content
     * @return \Illuminate\Http\Response
     */
    public function comment(CommentStoryStoreRequest $request,Content $content)
    {
        $result = CommentStory::create([
                'content_id' => $content->id,
                'user_id' => auth()->user()->id,
                'comment' => $request->comment
            ]);

        return response()->json([
                'message' => 'Success',
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
        $content = Content::with(['appreciates', 'comments'])
            ->where('id', $id)
            ->first();
            
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
    public function update(StoryUpdateRequest $request, $id)
    {
        $content = Content::findOrFail($id);
        $content->update($request->validated());

        return response()->json($content, 202);
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
