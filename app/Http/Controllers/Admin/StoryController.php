<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Resources\StoryResource;
use App\Http\Controllers\Controller;
use DB;
use Str;

use App\Story;
use App\Organization;
use App\Category;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $stories = Story::with(['categories:name', 'media', 'organization.media'])->withCount(['appreciates', 'comments'])->latest();
        $type = '';

        if($type = $request->get('type'))
            $stories->when($type=='drafts', fn($sub) => $sub->whereNull('posted_at'))
            ->when($type=='published', fn($sub) => $sub->whereNotNull('posted_at'));

        if($string = $request->get('search')) {
            $stories->where('title', 'like', '%'.$string.'%');
        }

        return StoryResource::collection( $stories->paginate() );
    }

    public function onlyPublished(Request $request)
    {
        $stories = Story::with(['categories:name', 'media', 'organization.media'])
            ->withCount(['appreciates', 'comments'])
            ->whereNotNull('posted_at')
            ->latest();

        if($string = $request->get('search')) {
            $stories->where('title', 'like', '%'.$string.'%');
        }

        return StoryResource::collection( $stories->paginate() );
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'short_description' => 'required',
        ]);
        DB::beginTransaction();
        try {
            // $org = Organization::inRandomOrder()->first(); //Change me.
            if( $orgForm = $request->get('organization') ) {
                $id = $orgForm['id'] ?? $orgForm['value'] ?? null;
                $org = Organization::unfilter()->findOrFail($id);
            } else if(auth()->user()->hasRole('organization admin')){
                $org = Organization::unfilter()->findOrFail(session('org_id'));
            }
            $story = Story::create([
                'user_id' => (auth()->user())->id, 
                'organization_id' => optional($org)->id ?? 1,
                'posted_at' => $request->get('saveAs') != 'draft' ? now() : null,
            ] + $request->only('title', 'need_id', 'description', 'short_description', 'raw_draft_json') );

            if($category = $request->get('category')){
                $cat_names = array_map(fn($cat) => ($cat['name'] ?? $cat['value'] ?? $cat['slug'] ?? null), $category ?? []);
                $categories = Category::where('name', $cat_names)->get();
                $story->categories()->sync($categories);
            }

            if ($image = $request->get('photo')) {

                    
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $story 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $story->getMedia('photo');
            }

            DB::commit();
            return new StoryResource($story, true);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage(), 'stack' => $e->getTrace()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function show(Story $story)
    {
        $story->loadMissing(['categories', 'media', 'organization']);

        return new StoryResource($story, true);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function edit(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Story $story)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'short_description' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $story = $story->fill([
                'posted_at' => $request->get('saveAs') != 'draft' ? now() : null,
            ] + $request->only('title', 'description', 'short_description', 'raw_draft_json') );

            if($category = $request->get('category')){
                $cat_names = array_map(fn($cat) => ($cat['name'] ?? $cat['value'] ?? $cat['slug'] ?? null), $category ?? []);
                $categories = Category::where('name', $cat_names)->get();
                $story->categories()->sync($categories);
            }
            
            if(!isset($story->organization_id)) {
                if( $orgForm = $request->get('organization') ) {
                    $story->organization_id = $orgForm['id'] ?? $orgForm['value'] ?? null;
                } else if(auth()->user()->hasRole('organization admin')){
                    $story->organization_id = session('org_id');
                }
            }

            if ($image = $request->get('photo')) {
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;

                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $story 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $story->getMedia('photo');
            }
            skipPhoto:

            $story->save();
            
            DB::commit();
            return new StoryResource($story, true);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function destroy(Story $story)
    {
        DB::beginTransaction();
        try {
            $story->delete();
            DB::commit();
            return response()->json(['Successfully deleted'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function toggle(Story $story)
    {
        DB::beginTransaction();
        try {
            $story->update([
                'posted_at' => !isset($story->posted_at) ? now() : null
            ]);
            DB::commit();
            return response()->json(['Successfully updated'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function share(Story $story){
        DB::beginTransaction();
        try {
            // $story->update([
            //     'posted_at' => !isset($story->posted_at) ? now() : null
            // ]);
            DB::commit();
            return response()->json(['Successfully shared'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
