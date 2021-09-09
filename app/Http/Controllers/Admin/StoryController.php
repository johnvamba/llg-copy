<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Resources\StoryResource;
use App\Http\Controllers\Controller;
use DB;
use Str;
use App\Jobs\Mail\StoryPublishing;
use App\Story;
use App\Organization;
use App\Category;
use App\Activity;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        DB::enableQueryLog();
        $stories = Story::with(['categories:name', 'media', 'organization.media'])
        ->withCount(['appreciates', 'comments'])
        ->authorRole()
        ->latest();
        $type = '';

        if($string = $request->get('search')) {
            $stories->where(function($q) use ($string) {
                //We'll allow other searches thru here
                $q->where('title', 'like', '%'.$string.'%')
                ->orWhereHas('organization', fn($o) => $o->where('organizations.name', 'like', '%'.$string.'%'));
            });
        }

        if($request->get('type') == 'drafts'){
            $stories->whereNull('posted_at')->whereNull('submitted_at');
        } else if($request->get('type') == 'submissions') {
            $stories->whereNotNull('submitted_at')->whereNull('posted_at');
        } else {
            $user = auth()->user();
            if (optional($user)->hasRole('organization admin')){
                $stories->whereNotNull('submitted_at');
            } else if (optional($user)->hasRole(['campus admin','admin'])) {
                $stories->whereNotNull('posted_at');
            }
        }
        StoryResource::setConversion('listing');

        if($request->get('debug')){
            dd($stories->get(), DB::getQueryLog(), session()->only(['camp_id','org_id']));
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

        StoryResource::setConversion('listing');

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
        // dd($request->get('feature'));
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

            if($user = auth()->user()){
                if($user->hasRole('organization admin'))
                    $story->update([
                        'featured_start_date' => null,
                        'submitted_at' => $request->get('saveAs') != 'draft' ? now() : null,
                    ]);
                else if($user->hasRole(['campus admin','admin']))
                    $story->update([
                        'featured_start_date' => $request->get('feature') == 'true' ? now() : null,
                        'posted_at' => $request->get('saveAs') != 'draft' ? now() : null,
                        'submitted_at' => $request->get('saveAs') != 'draft' ? now() : null
                    ]);
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

        if(auth()->user())
            StoryResource::setConversion('view');

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
            
            if( $orgForm = $request->get('organization') ) {
                $story->organization_id = $orgForm['id'] ?? $orgForm['value'] ?? null;
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

            if($user = auth()->user()){
                if($user->hasRole('organization admin'))
                    $story->fill([
                        'submitted_at' => $request->get('saveAs') != 'draft' ? now() : null,
                    ]);
                else if($user->hasRole(['campus admin','admin']))
                    $story->fill([
                        'featured_start_date' => $request->get('feature') == 'true' ? now() : null,
                        'posted_at' => $request->get('saveAs') != 'draft' ? now() : null,
                    ]);
            }

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
            if(!$user = auth()->user())
                throw new \Exception("Missing authenticated user");
            if(!$user->hasRole(['campus admin', 'admin']))
                throw new \Exception("Only admins and campus admin required ", 1);
                
            $story->update([
                'posted_at' => !isset($story->posted_at) ? now() : null
            ]);

            if(isset($story->posted_at)) {
                dispatch(new StoryPublishing($story));

                Activity::create([
                    'model_type' => Story::class,
                    'model_id' => $story->id,
                    'user_id' => optional(auth()->user())->id,
                    'description' => 'published ',
                    'short_description' => $story->title,
                ]);
            }

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
