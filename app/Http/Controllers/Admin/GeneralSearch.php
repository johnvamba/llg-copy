<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\SearchCollection;

use App\Need;
use App\Story;
use App\ServiceOffer as Offer;

use App\Group;
use App\Organization;

class GeneralSearch extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if($string = $request->get('search')){
            $needResults = Need::latest()->with(['media', 'type'])
                ->where('title', 'like', '%'.$string.'%')->take(5);

            $storyResults = Story::latest()->with(['media'])
                ->where('title', 'like', '%'.$string.'%')->take(5);

            $offersResults = Offer::latest()->with(['media', 'serviceType'])
                ->where('title', 'like', '%'.$string.'%')->take(5);

            $groupResults = Group::latest()->with(['media'])
                ->where('name', 'like', '%'.$string.'%')->take(5);

            // $orgResults = Organization::latest()->with(['media'])
            //     ->where('name', 'like', '%'.$string.'%')->take(5);

            $resultCollection = collect([
                'needResults' => $needResults->get(),
                'storyResults' => $storyResults->get(),
                'offersResults' => $offersResults->get(),
                'groupResults' => $groupResults->get(),
                // 'orgResults' => $orgResults->get(),
            ]);
            
            return new SearchCollection($resultCollection);
        }

        return response()->json("Empty Search Entry", 400);
    }
}
