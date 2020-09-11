<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Invoice;
use Carbon\Carbon;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDonatedByTerms(Request $request)
    {
        $date = Carbon::now();

        $donationToday = Invoice::where(
                'created_at', $date->toDateString()
            )
            ->get()
            ->sum('amount');

        $donationInWeek = Invoice::where([
                ['created_at', '>=', $date->startOfWeek()->toDateString()],
                ['created_at', '<=', $date->endOfWeek()->toDateString()]
            ])
            ->get()
            ->sum('amount');
        
        $donationInMonth = Invoice::where([
                ['created_at', '>=', $date->startOfMonth()->toDateString()],
                ['created_at', '<=', $date->endOfMonth()->toDateString()]
            ])
            ->get()
            ->sum('amount');

        $donation['today'] = round($donationToday, 2);
        $donation['week'] = round($donationInWeek, 2);
        $donation['month'] = round($donationInMonth, 2);

        return response()->json($donation);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTopDonors(Request $request)
    {
        $users = User::with(['invoice' => function($query) {
                $query->where('model_type', 'App\Need');
            },'invoice.model'])
            ->get();

        foreach ($users as $user) {
            $user['donated'] = $user->invoice->sum('amount');
        }

        $hasDonated = $users->filter(function ($user) {
                return $user->donated > 0;
            });


        $sorted = $hasDonated->sortByDesc('donated');
        $result = $sorted->values()->take(10)->all();

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
