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
use App\Jobs\Mail\NeedStatus;
use App\Http\Resources\Mini\UserResource;
use App\Http\Resources\Async\GeneralResource;
use App\Http\Resources\NeedResource;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use App\Activity;

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
        $need = Need::with(['type', 'media', 'categories', 'organization' => fn($org) => $org->unfilter()])
            ->latest();
        $fullRaw = 'sum(case when needs.approved_at is not null then 1 else 0 end) as aggregate';
        if($user = auth()->user()){
            //filter by user here
            if($user->hasRole('organization admin')){
                $fullRaw = 'count(*) as aggregate';
            }
        }

        if($tab = $request->get('tab')){
            $need->when($tab == 'request', fn($need) => $need->whereNull('approved_at') )
                ->when($tab == 'all', function($need) {
                    if($user = auth()->user()){
                        if(!$user->hasRole('organization admin'))
                            $need->whereNotNull('approved_at');
                    }
                } )
                ->when($tab == 'current', fn($need) => $need->onlyOnGoing() )
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

        if($search = $request->get('search')) {
            $need->where('title', 'like', '%'.$search.'%');
        }

        if($request->get('debug')){
            dd($need->get(), DB::getQueryLog(),session()->only(['camp_id','org_id']));
        }

        $additional = Need::select( 
            DB::raw('sum(case when needs.approved_at is null then 1 else 0 end) as requests'),
            DB::raw($fullRaw),
            DB::raw('sum(case when needs.approved_at is not null and goal > raised then 1 else 0 end) as current'),
            DB::raw('sum(case when needs.approved_at is not null and goal <= raised then 1 else 0 end) as past') )
            ->first();
            
        NeedResource::setConversion('listing');

        return NeedResource::collection( 
            $need->paginate($request->get('per_page') ?? 15)
                // ->appends($request->except('page')) //Doenst need 
        )->additional([
            'requests' => $additional->requests ?? 0,
            'aggregate' => $additional->aggregate ?? 0,
            'current' => $additional->current ?? 0,
            'past' => $additional->past ?? 0,
        ]);
    }

    public function async(Request $request)
    {
        $needs = Need::latest();

        if($title = $request->get('title')){
            $needs->where('title', 'like', "%".$title."%");
        }

        if($type = $request->get('type')) {
            $needs->whereHas('type', function($t) use ($type) {
                if(is_array($type)) {
                    $t->whereIn('needs_types.name', $type);
                } else {
                    $t->where('needs_types.name', $type);
                }
            });
        }

        return GeneralResource::collection($needs->paginate());
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
            // 'address' => 'required',
            'location' => ['required', function($att, $value, $fail) {
                $loc = $value['formatted_address'] ?? $value['location'] ?? null;
                if(!$loc) {
                    $fail('Missing location field');
                }
            } ], //doesn't really work
            'photo' => 'required',
            // 'need_link' => 'url',
            // 'time'=> 'exclude_if:type,volunteer|required',
            // 'date'=> 'exclude_if:type,volunteer|required'
        ]);
        //->sometimes(['time', 'date'], 'required', fn($field) => $field == 'volunteer');

        DB::beginTransaction();
        try {
            $type = NeedsType::where('name', ucfirst( $request->get('type') ) )->firstOrFail();

            if($org = $request->get('organization')) {
                $organization = Organization::findOrFail($org['id'] ?? 0);
            } else if($session = session('org_id')) {
                //Query user under what organization here instead
                $organization = Organization::findOrFail( $session );
            } else {
                throw new \Exception("Missing Organization");
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
                    'description',
                    'requirements',
                    'address',
                    'need_link'
                ]) +
                //dynamic details
                [
                    // 'short_description' => $request->get('description') ?? 'No description',
                    'location' => $location['formatted_address'] ?? $location['location'] ?? $location ?? null,
                    'lat' => $location['lat'] ?? null,
                    'lng' => $location['lng'] ?? null,
                ]
            );

            if($request->has('date', 'time', 'endtime')){
                $date = Carbon::parse($request->get('date'));
                $time = Carbon::parse($request->get('time')); 
                $endtime = Carbon::parse($request->get('endtime')); 

                $need->scheduled_at = $date->setTime($time->hour, $time->minute);
                $need->ended_at = (clone $date)->setTime($endtime->hour, $endtime->minute);
                if($endtime->lessThan($time)) {
                    $need->ended_at->addDay();
                }
            } else {
                $need->scheduled_at = now();
                $need->ended_at = now();
            }

            $need->save();

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = NeedsCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
                $need->categories()->sync($categories);
            }
            //We can do better pd diri.
            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $need 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $need->getMedia('photo');
            }

            Activity::create([
                'model_type' => Need::class,
                'model_id' => $need->id,
                'user_id' => auth()->user()->id,
                'description' => 'submitted ',
                'short_description' => $request->title,
            ]);

            $need->loadMissing('type', 'media', 'organization');

            DB::commit(); //commit to db            
            return new NeedResource($need);
        } catch (\Exception $e) {
            DB::rollBack();
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
        $need->loadMissing('media', 'type', 'organization', 'categories');//->loadCount('contributors');

        NeedResource::setConversion('view');

        return new NeedResource($need);
    }

    public function showWithCred(Request $request)
    {
        $need = Need::with(['organization.credential', 'type', 'media'])->find($request->get('need'));

        if(!$need)
            return response()->json([ 'error' => 'Missing need!'], 400);

        if(!$org = $need->organization)
            return response()->json([ 'error' => 'Missing organization!'], 400);

        if(!$cred = $org->credential)
            return response()->json([ 'error' => 'Missing credential!'], 400);

        if(!$key = $cred->publishable_key)
            return response()->json([ 'error' => 'Missing stripe key!'], 400);

        NeedResource::setConversion('invoice');

        $need->pk = $key;

        return new NeedResource($need);
    }

    public function contributors(Need $need)
    {
        // \DB::enableQueryLog();
        $need->loadMissing([
            'contributors' => fn($contri) => $contri->withoutGlobalScopes()->with('profile')->select(["users.*", "need_mets.created_at as custom_date"])]);

        // dd(\DB::getQueryLog(), $need->contributors);
        return UserResource::collection($need->contributors);
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
        $request->validate([
            'title' => 'required|string',
            'category' => 'required',
            'type'  => 'required',
            'goal' => 'required',
            'description' => 'required',
            // 'need_link' => 'url',
            // 'address' => 'required',
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

            $need->fill(
                [   //attach references. type and organization
                    'needs_type_id' => $type->id,
                    'organization_id' => $organization->id
                ] + //Add other settings 
                $request->only([
                    'needs_type_id',
                    'title',
                    'raised',
                    'goal',
                    'description',
                    'requirements',
                    'address',
                    'need_link'
                ]) +
                //dynamic details
                [
                    // 'short_description' => $request->get('description') ?? 'No description',
                    'location' =>$location['formatted_address'] ?? $location['location'] ?? $location ?? null,
                    'lat' => $location['lat'] ?? null,
                    'lng' => $location['lng'] ?? null,
                ]
            );

            if($catlist = $request->get('category')){
                $catlist = array_map(fn($i) => $i['id'] ?? $i['name'] ?? null, $catlist);
                $categories = NeedsCategory::whereIn('name', $catlist)
                    ->orWhereIn('id', $catlist)
                    ->get();
               $need->categories()->sync($categories);

            }

            if($request->has('date', 'time', 'endtime')){
                $date = Carbon::parse($request->get('date'));
                $time = Carbon::parse($request->get('time')); 
                $endtime = Carbon::parse($request->get('endtime')); 

                $need->scheduled_at = $date->setTime($time->hour, $time->minute);
                $need->ended_at = (clone $date)->setTime($endtime->hour, $endtime->minute);
                if($endtime->lessThan($time)) {
                    $need->ended_at->addDay();
                }
            } 

            //We can do better pd diri.
            if ( ($image = $request->get('photo')) && !preg_match('/^http/', $image) ) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $need 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $need->getMedia('photo');
            }

            $need->save();
            DB::commit(); //commit to db
            $need->loadMissing('type', 'media', 'organization');
            return new NeedResource($need);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=> $e->getMessage(), 'stack'=>$e->getTrace()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Organization $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Need $need)
    {
        DB::beginTransaction();
        try {
            $need->delete();

            DB::commit();
            return response()->json('Deleted', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }
    }

    //Extra
    public function types()
    {

    }

    public function approve(Need $need){
        DB::beginTransaction();
        try {
            if(!optional(auth()->user())->hasRole(['admin', 'campus admin']))
                throw new Exception("Could not approve request!");
                
            //Do validation here
            $need->fill([
                'approved_by' => auth()->user()->id,
                'approved_at' => now()
            ]);
            dispatch(new NeedStatus($need, true));
            $need->save();

            Activity::create([
                'model_type' => Need::class,
                'model_id' => $need->id,
                'user_id' => auth()->user()->id,
                'description' => 'approved ',
                'short_description' => $need->title,
            ]);

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    public function disapprove(Need $need){
    DB::beginTransaction();
        try {
            dispatch(new NeedStatus($need, false));
            $need->delete();

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    public function needCountOnMonths() 
    {
        $now = Carbon::now();
        $start = (clone $now)->subYear();
        $period = CarbonPeriod::create($start, '1 month', $now)->toArray();

        $needs = Need::whereBetween('needs.created_at', [$start, $now])
            ->leftJoin('needs_types', 'needs_types.id', 'needs.needs_type_id')
            ->selectRaw("needs_types.name as need_type, count(needs.id) as data, YEAR(needs.created_at) year, MONTH(needs.created_at) month")
            ->groupBy('need_type')//;
            ->groupBy('year')
            ->groupBy('month')
            ->get();
        
        $output = array_reduce($period, function($carry, $item) use ($needs) {
            $carry['donation'][] = $needs->first(fn($need, $key) => $need->year == $item->year && $need->month == $item->month && $need->need_type =='Donation')['data'] ?? 0;
            $carry['fundraise'][] = $needs->first(fn($need, $key) => $need->year == $item->year && $need->month == $item->month  && $need->need_type =='Fundraise')['data'] ?? 0;
            $carry['volunteer'][] = $needs->first(fn($need, $key) => $need->year == $item->year && $need->month == $item->month  && $need->need_type =='Volunteer')['data'] ?? 0;
            $carry['categories'][] = $item->format('M Y');
            return $carry;
        }, [
            'donation' => [],
            'fundraise' => [],
            'volunteer' => [],
            'year' => $now->year
        ]);

        return response()->json($output, 200);
    }   
}
