<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\NeedsMetStoreRequest;
use App\Http\Requests\NeedsMetUpdateRequest;
use App\Content;
use App\NeedsMet;
use App\Tag;
use DB;

class NeedsMetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contents = Content::with('needsMet')
                ->where('type', 'needs')
                ->paginate();

        return response()->json($contents, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NeedsMetStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $content = Content::createContent($request);
                $needsmet = NeedsMet::createNeedsMet($request, $content->id);

                if ($request->tags) {
                    $tags = Tag::createTag($content, $request->tags);
                    $content['tags'] = $tags;
                }

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
        $result = Content::with('needsMet')
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
    public function update(NeedsMetUpdateRequest $request, $id)
    {
        //
        $content = Content::findOrFail($id);
        $content->update(
                request()->only([
                    'title',
                    'description',
                    'type',
                    'status'
                ])
            );

        $needsMet = NeedsMet::where('content_id', $content->id)->first();
        $needsMet->update(request()->only([
                'needs_met_category_id',
                'needs_met_type_id',
                'location',
                'lat',
                'lng',
                'raised',
                'goal',
            ]));

        $content['needs_met'] = $needsMet;

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
        try {
            $content->delete();
            
            return response()->json([
                    'message' => 'Needs Met successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
