<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\ServiceOffer;
use App\ServiceType;
use App\User;

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
        $offers = ServiceOffer::latest()->with('serviceType');

        if($user = auth()->user()){
            //filter by user here
        }

        return OfferResource::collection($offers->paginate())
            ->additional([
                'offers_count' => ServiceOffer::count()
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
            'description' => 'required',
            'location' => 'required',
            'description' => 'required',
            'photo' => 'required',
            'business_name' => 'required',
            'business_contact' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $category = $request->get('category') ?? null;

            $user = auth()->user();

            $type = ServiceType::where('name', $category['name'] ?? '')->first();

            $location = $request->get('location');

            $offer = ServiceOffer::create(
                $request->only('title', 'description', 'business_name', 'business_contact') 
                + [
                    'model_type' => User::class,
                    'model_id' => optional($user)->id ?? 1,
                    'service_type_id' => optional($type)->id ?? 1,
                    'location' => $location['location'] ?? 'N/A',
                    'lng' => $location['lng'] ?? 0.0,
                    'lat' => $location['lat'] ?? 0.0,
                ]
            );

            if ($image = $request->get('photo')) {
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                dd($image,$name,$extension);
                
                $offer 
                    ->addMediaFromBase64($image)
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

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
        //
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
            'busName' => 'required',
            'busContact' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $category = $request->get('category') ?? null;

            $user = auth()->user();

            $type = ServiceType::where('name', $category['name'] ?? '')->firstOrFail();
            $location = $request->get('location');

            $offer->fill(
                $request->only('title', 'description') 
                + [
                    'model_type' => User::class,
                    'model_id' => optional($user)->id ?? 1,
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
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                $offer->getMedia();
            }

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
        //
    }
}
