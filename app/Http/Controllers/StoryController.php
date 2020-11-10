<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Requests\StoryStoreRequest;
use App\Http\Requests\StoryUpdateRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Story;
use App\Tag;
use App\StoryAppreciate;
use App\CommentStory;
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
        $stories = Story::with(
                'user', 
                'user.profile', 
                'organization', 
                'appreciates',
                'appreciates.user',
                'appreciates.user.profile',
            )
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($stories as $story) {
            $story['photo'] = $story->getFirstMediaUrl('photo');
        }

        return response()->json($stories);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStories(Request $request)
    {
        $results['columns'] = [
                'id',
                'title',
                'description',
            ];

        $stories = Story::orderBy('created_at', 'desc')
            ->get()
            ->chunk($request->limit);

        $results['data'] = $stories;
        $results['module'] = [
                'path' => '/stories',
                'endpoint' => 'stories',
                'singular' => 'story',
                'path' => 'stories',
            ];

        return response()->json($results);
    }

    /**
     * Display featured story
     *
     * @return \Illuminate\Http\Response
     */
    public function featuredStory()
    {
        $date = Carbon::now()->toDateString();

        $story = Story::with(
                'user', 
                'organization', 
                'appreciates',
                'appreciates.user',
            )
            ->where('featured_start_date', '<=', $date)
            ->where('featured_end_date', '>=', $date)
            ->inRandomOrder()
            ->first();

        if ($story) {
            $story->getMedia('photo');
        }

        return response()->json($story);
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
                $story = Story::create(
                        array_merge(
                            request()->only([
                                'organization_id',
                                'title',
                                'description',
                                'featured_start_date',
                                'featured_end_date'
                            ]),
                            ["user_id" => auth()->user()->id]
                        )
                    );

                $story->short_description = $request->description;
                $story->save();

                if ($request->get('media')) {
                    $image = $request->get('media');
                    $name = time();
                    $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                    
                    $story 
                        ->addMediaFromBase64($image)
                        ->usingName($name)
                        ->usingFileName($name.'.'.$extension)
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));
                }

                if ($request->tags) {
                    $tags = Tag::createTag($story, $request->tags);
                    $story['tags'] = $tags;
                }

                return $story;
            });

        return response()->json($result, 202);
    }

    /**
     * Appreciate story
     *
     * @param  json
     * @return \Illuminate\Http\Response
     */
    public function addAppreciate(Story $story)
    {
        $appreciate = StoryAppreciate::create([
                'story_id' => $story->id,
                'user_id' => auth()->user()->id
            ]);

        return response()->json($appreciate, 202);
    }

    /**
     * Comment to story
     *
     * @param json
     * @return \Illuminate\Http\Response
     */
    public function addComment(Request $request, Story $story)
    {
        $comment = CommentStory::create([
                'story_id' => $story->id,
                'user_id' => auth()->user()->id,
                'comment' => $request->comment
            ]);

        return response()->json($comment, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Story $story)
    {
        $result = Story::with(
                'user', 
                'organization', 
                'appreciates',
                'appreciates.user',
            )
            ->where('id', $story->id)
            ->first();

        $result->getMedia('photo');

        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoryUpdateRequest $request, Story $story)
    {
        $story->update($request->validated());

        return response()->json($story, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Story $story)
    {
        try {
            $story->delete();
            
            return response()->json([
                    'message' => 'Story successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
