<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Organization;
use App\Campus;
use App\Need;
use Carbon\Carbon;
class Dashboard extends Controller
{
    public function __invoke(Request $request)
    {
    	//Setup
    	$query = Need::with(['type', 'organization']);
    	$startDate = $request->get('startdate') ? Carbon::parse($request->get('startdate'))->startOfDay() : null; 
		$endDate = $request->get('enddate') ? Carbon::parse($request->get('enddate'))->endOfDay() : null;
		//If need is still open.
    	if($request->get('open') == 'true'){
    		$query->where(function($need) {
    			$need->whereRaw('raised < goal')->whereNotNull('approved_at');
    		});
    	}
    	//if need has been met
    	if($request->get('mets') == 'true'){
    		$query->where(function($need){
    			$need->whereRaw('raised >= goal')->whereNotNull('approved_at');
    		});
    	}
    	//if in types
    	if($set = $request->only('donations', 'fundraise', 'volunteer')) {
    		$keys = array_map(fn($f) => ucfirst($f), array_keys( array_filter($set, fn($i) => $i == 'true') ) );
    		$query->whereHas('type', fn($type) => $type->whereIn('needs_types.name', $keys) );
    	}

        if($campus = $request->get('campus')) {
            $query->whereHas('campus', fn($camp) => $camp->where('campuses.id', $campus['id'] ?? $campus ));
        }

        if($org = $request->get('org')){
            $query->whereHas('organization', fn($organ) => $organ->where('organizations.id', $org['id'] ?? $org ));
        }

    	if($startDate && !$endDate)
    		$query->whereDate('created_at', '>', $startDate);
    	else if(!$startDate && $endDate)
    		$query->whereDate('created_at', '<=', $endDate);
    	else if($startDate && $endDate)
    		$query->whereBetween('created_at', [$startDate, $endDate]);

    	$needs = $query->latest()->get();

    	return view('template.report', compact('needs'));
    }

    public function test(Request $request)
    {
        //Setup
        $query = Need::with(['type', 'organization']);
        $startDate = $request->get('startdate') ? Carbon::parse($request->get('startdate'))->startOfDay() : null; 
        $endDate = $request->get('enddate') ? Carbon::parse($request->get('enddate'))->endOfDay() : null;
        //If need is still open.
        if($request->get('open') == 'true'){
            $query->where(function($need) {
                $need->whereRaw('raised < goal')->whereNotNull('approved_at');
            });
        }
        //if need has been met
        if($request->get('mets') == 'true'){
            $query->where(function($need){
                $need->whereRaw('raised >= goal')->whereNotNull('approved_at');
            });
        }
        //if in types
        if($set = $request->only('donations', 'fundraise', 'volunteer')) {
            $keys = array_map(fn($f) => ucfirst($f), array_keys( array_filter($set, fn($i) => $i == 'true') ) );
            $query->whereHas('type', fn($type) => $type->whereIn('needs_types.name', $keys) );
        }

        if($campus = $request->get('campus')) {
            $query->whereHas('campus', fn($camp) => $camp->where('campuses.id', $campus['id'] ?? $campus ));
        }

        if($org = $request->get('org')){
            $query->whereHas('organization', fn($organ) => $organ->where('organizations.id', $org['id'] ?? $org ));
        }

        if($startDate && !$endDate)
            $query->whereDate('created_at', '>', $startDate);
        else if(!$startDate && $endDate)
            $query->whereDate('created_at', '<=', $endDate);
        else if($startDate && $endDate)
            $query->whereBetween('created_at', [$startDate, $endDate]);

        $needs = $query->latest()->get();

        return view('template.report', compact('needs'));
    }
}
