<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Http\Requests\NeedsStoreRequest;
// use App\Http\Requests\NeedsUpdateRequest;
use DB;
use Str;

use App\Organization;
use App\NeedsCategory;
use App\NeedHasCategory;
use App\NeedsType;
use App\Need;
use App\NeedMet;
use App\Tag;

use App\Http\Resources\NeedResource;
use Carbon\Carbon;
class NeedsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        DB::enableQueryLog();
        $need = Need::with(['type', 'media'])
            ->latest();

        if($user = auth()->user()){
            //filter by user here
        }

        if($tab = $request->get('tab')){
            $need->when($tab == 'request', fn($need) => $need->whereNull('approved_at') )
                ->when($tab == 'all', fn($need) => $need->whereNotNull('approved_at') )
                ->when($tab == 'current', fn($need) => $need->whereRaw('raised < goal')->whereNotNull('approved_at') )
                ->when($tab == 'past', fn($need) => $need->whereRaw('raised >= goal')->whereNotNull('approved_at') );
        }

        if($type = $request->get('type')){
            $need->whereHas('type', fn($query) => $query->where('name', ucfirst($type)) );
        }

        if($request->has('min') || $request->has('max')){
            $need->when($request->has('min', 'max'), fn($need) => $need->whereBetween('goal', $request->only('min', 'max')))
                ->when($request->has('min'), fn($need) => $need->where('goal', '>=', $request->get('min')))
                ->when($request->has('max'), fn($need) => $need->where('goal', '<=', $request->get('max')));
        }

        if($request->has('startdate') || $request->has('enddate')){
            $startdate = $request->get('startdate') ? Carbon::parse($request->get('startdate'))->startOfDay() : null;
            $enddate = $request->get('enddate') ? Carbon::parse($request->get('enddate'))->startOfDay() : null;

            $need->when($startdate || $enddate, fn($need) => $need->whereBetween('created_at', [$startdate, $enddate]))
                ->when($startdate, fn($need) => $need->where('created_at', '>=', $startdate))
                ->when($enddate, fn($need) => $need->where('created_at', '<=', $enddate));
        }

        if($request->get('debug')){
            dd($need->get(), DB::getQueryLog());
        }

        $additional = Need::select( 
            DB::raw('sum(case when needs.approved_at is null then 1 else 0 end) as requests'),
            DB::raw('sum(case when needs.approved_at is not null then 1 else 0 end) as aggregate'),
            DB::raw('sum(case when needs.approved_at is not null and goal > raised then 1 else 0 end) as current'),
            DB::raw('sum(case when needs.approved_at is not null and goal <= raised then 1 else 0 end) as past') )
            ->first();
        return NeedResource::collection( 
            $need->paginate()
                // ->appends($request->except('page')) //Doenst need 
        )->additional([
            'requests' => $additional->requests ?? 0,
            'aggregate' => $additional->aggregate ?? 0,
            'current' => $additional->current ?? 0,
            'past' => $additional->past ?? 0,
        ]);
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
            'title' => 'required|string',
            'category' => 'required',
            'type'  => 'required',
            'goal' => 'required',
            'description' => 'required',
            // 'time'=> 'exclude_if:type,volunteer|required',
            // 'date'=> 'exclude_if:type,volunteer|required'
        ]);
        //->sometimes(['time', 'date'], 'required', fn($field) => $field == 'volunteer');

        DB::beginTransaction();
        try {
            $type = NeedsType::where('name', ucfirst( $request->get('type') ) )->firstOrFail();

            if($org = $request->get('organization')) {
                $organization = Organization::findOrFail($org['id'] ?? 0);
            } else {
                //Query user under what organization here instead
                $organization = Organization::first();
            }

            $location = $request->get('location');

            $need = Need::create(
                [   //attach references. type and organization
                    'needs_type_id' => $type->id,
                    'organization_id' => $organization->id
                ] + //Add other settings 
                $request->only([
                    'needs_type_id',
                    'title',
                    'raised',
                    'goal',
                    'description'
                ]) +
                //dynamic details
                [
                    'short_description' => $request->get('description') ?? 'No description',
                    'location' =>$location['formatted_address'] ?? null,
                    'lat' => $location['lat'] ?? null,
                    'lng' => $location['lng'] ?? null,
                ]
            );

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = NeedsCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
                // dd($catlist, $categories);
                //Technically this is not how you do it.
                foreach ($categories as $key => $value) {
                    $hasCategory = NeedHasCategory::make([
                        'need_id' => $need->id
                    ]);
                            
                    $value->category()->save($hasCategory);
                }
            }
            //We can do better pd diri.
            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $need 
                    ->addMediaFromBase64($image)
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                $need->getMedia('photo');
            }

            DB::commit(); //commit to db
            $need->loadMissing('type', 'media', 'organization');
            return new NeedResource($need);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=> $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Need $need)
    {
        $need->loadMissing('media', 'type', 'organization');
        // dd($need->getMedia('photo'));
        return new NeedResource($need, true);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Need $need)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Need $need)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Need $need)
    {
        //
    }

    //Extra
    public function types()
    {

    }

    public function approve(Need $need){
        DB::beginTransaction();
        try {
            //Do validation here
            $need->fill([
                'approved_by' => auth()->user()->id,
                'approved_at' => now()
            ]);
            $need->save();

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    public function disapprove(Need $need){
    DB::beginTransaction();
        try {
            $need->delete();

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }
}
