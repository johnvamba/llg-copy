<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\ServiceOffer;
use App\ServiceType;
use App\User;
use App\Campus;
use App\Organization;

use App\Http\Resources\OfferResource;
use DB;
use Str;

class OffersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // DB::enableQueryLog();
        $offers = ServiceOffer::latest()->with('serviceType');

        if($status = $request->get('status') ) {
            $offers->where('status', $status);
        } else {
            $offers->where('status', 'approved');
        }

        if($search = $request->get('search')){
            $offers->where('title', 'like', '%'.$search.'%');
        }

        return OfferResource::collection($offers->paginate($request->get('per_page') ?? 15));
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
            'description' => 'required',
            'location' => 'required',
            'description' => 'required',
            'photo' => 'required',
            'business_name' => 'required',
            'business_contact' => 'required',
            // 'address' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $category = $request->get('category') ?? null;

            $user = auth()->user();
            $model_id = null;
            $model_type = null;
            if($user->hasRole('campus_user')){
                $model_id = session('camp_id', null);
                $model_type = Campus::class;
            } else if ($user->hasRole('organization admin')){
                $model_id = session('org_id', null);
                $model_type = Organization::class;
            }

            $type = ServiceType::where('name', $category['name'] ?? '')->first();

            $location = $request->get('location');

            $offer = ServiceOffer::create(
                $request->only('title', 'description', 'business_name', 'business_site', 'business_contact', 'address') 
                + [
                    'model_type' => $model_type ?? User::class,
                    'model_id' => $model_id ?? optional($user)->id ?? 1,
                    'service_type_id' => optional($type)->id ?? 1,
                    'location' => $location['location'] ?? 'N/A',
                    'lng' => $location['lng'] ?? 0.0,
                    'lat' => $location['lat'] ?? 0.0,
                ]
            );

            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $offer 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $offer->getMedia();
            }

            DB::commit();
            return new OfferResource($offer);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ServiceOffer $offer)
    {
        $offer->loadMissing(['serviceType']);

        return new OfferResource($offer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(ServiceOffer $offer)
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
    public function update(Request $request, ServiceOffer $offer)
    {
         $request->validate([
            'title' => 'required|string',
            'category' => 'required',
            'description' => 'required',
            'location' => 'required',
            'description' => 'required',
            'photo' => 'required',
            'business_name' => 'required',
            'business_contact' => 'required'
            // 'address' => 'required'
        ]);

        DB::beginTransaction();
        try {
            $category = $request->get('category') ?? null;

            $user = auth()->user();

            $type = ServiceType::where('name', $category['name'] ?? '')->firstOrFail();
            $location = $request->get('location');

            $offer->fill(
                $request->only('title', 'description', 'business_name', 'business_site', 'business_contact', 'address') 
                + [
                    // 'model_type' => User::class,
                    // 'model_id' => optional($user)->id ?? 1,
                    'service_type_id' => optional($type)->id ?? 1,
                    'location' => $location['location'] ?? 'N/A',
                    'lng' => $location['lng'] ?? 0.0,
                    'lat' => $location['lat'] ?? 0.0,
                ]
            );

            if ($image = $request->get('photo')) {
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $offer 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $offer->getMedia();
            }
            skipPhoto:

            $offer->save();
            DB::commit();
            return new OfferResource($offer);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceOffer $offer)
    {
        DB::beginTransaction();
        try {
            $offer->delete();

            DB::commit();
            return response()->json('Deleted', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }
    }

    public function approve(ServiceOffer $offer){
        DB::beginTransaction();
        try {
            //Do validation here
            $offer->fill([
                'status' => 'approved',
                'approved_by' => auth()->user()->id,
                'approved_at' => now()
            ]);
            $offer->save();

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }

    public function disapprove(ServiceOffer $offer){
    DB::beginTransaction();
        try {
            $offer->fill([
                'status' => 'denied',
                'approved_by' => auth()->user()->id,
            ]);
            $offer->save();

            DB::commit();
            return response()->json(['Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 400);
        }
    }
}
