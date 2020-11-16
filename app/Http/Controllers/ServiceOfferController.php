<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Http\Requests\ServiceOfferStoreRequest;
use App\Http\Requests\ServiceOfferUpdateRequest;
use Illuminate\Http\Request;
use App\User;
use App\Organization;
use App\ServiceOffer;
use App\Tag;
use DB;

class ServiceOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $serviceOffers = ServiceOffer::with('user','serviceType', 'organization')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($serviceOffers as $serviceOffer) {
            $serviceOffer->getMedia('photo');
        }

        return response()->json($serviceOffers);
    }

    /**
     * Display user service offered.
     *
     * @return \Illuminate\Http\Response
     */
    public function getServiceOffered(Request $request)
    {
        $serviceOffers = ServiceOffer::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) {
                    $query->where('model_id', auth()->user()->id);
                }
            )
            ->with('serviceType')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($serviceOffers as $serviceOffer) {
            $serviceOffer->getMedia();
            $serviceOffer['photo'] = $serviceOffer->getFirstMediaUrl('photo');
        }

        return response()->json($serviceOffers);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTotalOffers()
    {
        $serviceOffers = ServiceOffer::where(
                'status', 'approved'
            )->count();

        return response()->json($serviceOffers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOffers(Request $request)
    {
        $results['columns'] = [
                'id',
                'title',
                'description',
                'location',
            ];

        $serviceOffers = ServiceOffer::orderBy('created_at', 'desc')
            ->get()
            ->map->only(
                'id', 
                'title', 
                'description', 
                'location', 
            )
            ->chunk($request->limit);

        $results['data'] = $serviceOffers;
        $results['module'] = [
            'path' => '/offers',
            'endpoint' => 'service-offer',
            'singular' => 'offer',
            'plural' => 'offers',
        ];

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getServicesRequest()
    {
        $serviceOffers = ServiceOffer::with('user','serviceType', 'organization')
            ->where('status', 'pending')
            ->paginate();

        foreach ($serviceOffers as $serviceOffer) {
            $serviceOffer->getMedia('photo');
        }

        return response()->json($serviceOffers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceOfferStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
                $model = $request->organization_id 
                    ? Organization::find($request->organization_id)->first()
                    : User::find(auth()->user()->id);

                $makeOffer = ServiceOffer::make(
                        array_merge(
                            request()->only([
                                'service_type_id',
                                'name',
                                'title',
                                'description',
                                'location',
                                'lat',
                                'lng'
                            ]),
                            [ 
                                'business_name' => $request->businessName,
                                'business_site' => $request->businessSite,
                                'business_contact' => $request->contactNumber
                            ]
                        )
                    );

                $serviceOffer = $model->offers()->save($makeOffer);

                if ($request->tags) {
                    $tags = Tag::createTag($serviceOffer, $request->tags);
                    $serviceOffer['tags'] = $tags;
                }

                if ($request->get('media')) {
                    $image = $request->get('media');
                    $name = time().'-'.Str::random(20);
                    $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                    
                    $serviceOffer 
                        ->addMediaFromBase64($image)
                        ->usingName($name)
                        ->usingFileName($name.'.'.$extension)
                        ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                    $serviceOffer->getMedia();
                }

                return $serviceOffer;
            });

        return response()->json($result, 202);
    }

    /**
     * Service offer request action [approve, deny]
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function requestAction(Request $request, ServiceOffer $serviceOffer)
    {
        $serviceOffer->update(request()->only('status'));

        return response()->json($serviceOffer, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $serviceOffer = ServiceOffer::with('user', 'serviceType', 'organization')
            ->where('id', $id)
            ->first();
        $serviceOffer->getMedia('photo');

        return response()->json($serviceOffer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ServiceOfferUpdateRequest $request, ServiceOffer $serviceOffer)
    {
        $serviceOffer->update($request->validated());

        return response()->json($serviceOffer, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceOffer $serviceOffer)
    {
        try {
            $serviceOffer->delete();
            
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
