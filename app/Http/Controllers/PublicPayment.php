<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Need;

class PublicPayment extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if(!$user = auth()->user()) {
            return response()->json(['error'=> 'Missing User'], 400);
        }

        $need = Need::with(['organization' => fn($org) => $org->unfilter()->with('credential')])
            ->unfilter()
            ->find( $request->get('need_id') );

        if(!$need)
            return response()->json(['error'=> 'Missing Need'], 400);

        if(!$org = $need->organization)
            return response()->json(['error'=> 'Missing organization'], 400);

        if(!$credential = $org->credential)
            return response()->json(['error'=> 'Missing organization credential'], 400);

        if(!isset($credential->publishable_key))
            return response()->json(['error'=> 'Missing Stripe Id'], 400);

    }
}
