<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CampusResource;
use App\Http\Resources\Async\CampusResource as AsyncResource;
use App\Http\Resources\OrganizationResource as OrgResource;
use App\Http\Resources\Async\UserProfileResource;

use App\UserProfile;
use App\Campus;
use DB;
use Str;

class CampusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $campus = Campus::withCount('organizations')->with('media')
            ->when($org_id = session('org_id'), function($query) use ($org_id){
                $query->withCount(['organizations as accessed' => fn($q) => $q->where('organizations.id', $org_id)])
                    ->orderBy('accessed', 'desc');
            })->latest()->get();

        CampusResource::setConversion('view');

        return CampusResource::collection($campus);
    }

    /**
     * Display a listing of the resource for async selec.
     *
     * @return \Illuminate\Http\Response
     */
    public function async(Request $request)
    {
        DB::enableQueryLog();
        $campus = Campus::query();

        if($request->get('sort_latest')){
            $campus->latest();
        }
        //Add queries here

        if($name = $request->get('name')){
            $campus->where('name', 'like', '%'.$name.'%');
        }

        return AsyncResource::collection( $campus->paginate() );
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
            'name' => 'required',
            'description'=> 'required',
            'location' => 'required',
            'lng' => 'required',
            'lat' => 'required',
            // 'photo' => 
        ]);

        DB::beginTransaction();
        try {
            $campus = Campus::create( $request->only('name', 'location', 'lng', 'lat', 'description') ); //add description here
            //add photo here
            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $campus 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $campus->getMedia('photo');
            }

            DB::commit();
            return new CampusResource($campus);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function show(Campus $campus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function edit(Campus $campus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Campus $campus)
    {
        $request->validate([
            'name' => 'required',
            'description'=> 'required',
            'location' => 'required',
            'lng' => 'required',
            'lat' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $campus->fill( $request->only('name', 'location', 'lng', 'lat', 'description') ); //add description here
            //add photo here
            if ($image = $request->get('photo')) {
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $campus 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $campus->getMedia('photo');
            }
            skipPhoto:

            $campus->save();
            DB::commit();
            return new CampusResource($campus);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campus $campus)
    {
        //
    }

    public function orgs(Campus $campus)
    {
        $orgs = $campus->organizations()
            ->with('media')->withCount('members');

        return OrgResource::collection( $orgs->paginate() );
    }

    public function teams(Campus $campus)
    {
        $teams = UserProfile::with('user')->whereHas('user', 
            fn($user) => $user->whereHas('campus', fn($camp) => $camp->where('campuses.id', $campus->id))
        );

        return UserProfileResource::collection( $teams->paginate() );
    }
}
