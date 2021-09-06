<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Organization;
use App\Campus;
use App\Need;

use App\NeedMet;

use Carbon\Carbon;
class Dashboard extends Controller
{
    public function __invoke(Request $request)
    {
    	// Setup
    	$startDate = $request->get('startdate') ? Carbon::parse($request->get('startdate'))->startOfDay() : null; 
		$endDate = $request->get('enddate') ? Carbon::parse($request->get('enddate'))->endOfDay() : null;
		// //If need is still open.

        $needsmet = collect();
        $openneeds = collect();
        $show = 'mets';

        if ( filter_var($request->get('mets'), FILTER_VALIDATE_BOOLEAN) ) {
            $needsmet = $this->generateNeedMets($request, $startDate, $endDate);
        } else if ( filter_var($request->get('open'), FILTER_VALIDATE_BOOLEAN) ) {
            $show = 'open';
            $openneeds = $this->generateOpenNeeds($request, $startDate, $endDate);
        }

    	return view('template.report', compact('needsmet', 'openneeds', 'show'));
    }

    protected function generateNeedMets(Request $request, $startDate = null, $endDate = null) {
        $query = NeedMet::whereHas('need', fn($need) => $need->whereNotNull('needs.approved_at') )->with(['need_type','need.organization', 'model' => fn($user) => $user->withoutGlobalScopes() ]);

        if($set = $request->only('donations', 'fundraise', 'volunteer')) {
            $keys = array_map(fn($f) => ucfirst($f), array_keys( array_filter($set, fn($i) => filter_var($i, FILTER_VALIDATE_BOOLEAN) ) ) );
            $query->whereHas('need_type', fn($type) => $type->whereIn('needs_types.name', $keys) );
        }

        if($campus = $request->get('campus')) {
            $query->whereHas('need.campus', fn($camp) => $camp->where('campuses.id', $campus['id'] ?? $campus ));
        }

        if($org = $request->get('org')){
            $query->whereHas('need.organization', fn($organ) => $organ->where('organizations.id', $org['id'] ?? $org ));
        }

        if($startDate && !$endDate)
            $query->whereDate('created_at', '>', $startDate);
        else if(!$startDate && $endDate)
            $query->whereDate('created_at', '<=', $endDate);
        else if($startDate && $endDate)
            $query->whereBetween('created_at', [$startDate, $endDate]);

        return $query->latest()->get();
    }

    protected function generateOpenNeeds(Request $request, $startDate = null, $endDate = null) {
        $query = Need::with(['type', 'organization'])->whereRaw('raised < goal')->whereNotNull('approved_at');

        if($set = $request->only('donations', 'fundraise', 'volunteer')) {
            $keys = array_map(fn($f) => ucfirst($f), array_keys( array_filter($set, fn($i) => filter_var($i, FILTER_VALIDATE_BOOLEAN) ) ) );
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

        return $query->latest()->get();
    }
}
