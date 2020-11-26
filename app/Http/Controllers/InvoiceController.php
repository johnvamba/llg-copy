<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceUpdateRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\User;
use App\Invoice;
use App\Need;
use Carbon\Carbon;
use DB;

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
    public function getDonations(Request $request)
    {
        $date = Carbon::now();

        $donations = Invoice::sum('amount');
        
        $donationInMonth = Invoice::where([
                ['created_at', '>=', $date->startOfMonth()->toDateString()],
                ['created_at', '<=', $date->endOfMonth()->toDateString()]
            ])->sum('amount');

        $donation['donations'] = round($donations, 2);
        $donation['month'] = round($donationInMonth, 2);

        return response()->json($donation);
    }
    
    /**
     * Display recent donors.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRecentDonors(Request $request)
    {
        $recentDonors = Invoice::with('user', 'user.profile')
            ->whereHasMorph(
                'model',
                ['App\Need'],
                function($query) use ($request){
                    $query->where('model_id', $request->need_id);
                }
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($recentDonors);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getNeedsDonations(Request $request)
    {
        $date = Carbon::now();

        $results['year'] = $date->year;

        for ($counter = 0; $counter < 12; $counter++) {
            $newDate = $date->month($counter+1)->day(1)->hour(0)->minute(0)->second(0)->toDateString();
            $startDate = Carbon::parse($newDate)->startOfMonth()->toDateString();
            $endDate = Carbon::parse($newDate)->endOfMonth()->toDateString();

            $invoiceDonations = Invoice::whereHasMorph(
                    'model',
                    'App\Need',
                    function(Builder $query) {
                        $query->where('needs_type_id', 1);
                    }
                )->where([
                    ['created_at', '>=', $startDate],
                    ['created_at', '<=', $endDate],
                ])->get();

            $invoiceFundraises = Invoice::whereHasMorph(
                    'model',
                    'App\Need',
                    function(Builder $query) {
                        $query->where('needs_type_id', 2);
                    }
                )->where([
                    ['created_at', '>=', $startDate],
                    ['created_at', '<=', $endDate],
                ])->get();

            $invoiceVolunteers = Invoice::whereHasMorph(
                    'model',
                    'App\Need',
                    function(Builder $query) {
                        $query->where('needs_type_id', 3);
                    }
                )->where([
                    ['created_at', '>=', $startDate],
                    ['created_at', '<=', $endDate],
                ])->get();

            $results['donation'][$counter] = $invoiceDonations->sum('amount');
            $results['fundraise'][$counter] = $invoiceFundraises->sum('amount');
            $results['volunteer'][$counter] = $invoiceVolunteers->sum('amount');
        }

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTopDonors(Request $request)
    {
        $users = User::with(['invoice' => function($query) {
                    $query->with('organization')
                    ->select(DB::raw('invoices.*, SUM(amount) as donations, count(*) as total'))
                    ->groupBy(['user_id', 'organization_id'])
                    ->orderBy('donations', 'desc');
            }, 'invoice.model'])
            ->get();

        foreach ($users as $user) {
            if (count($user->invoice) > 0) {
                $user['donated'] = $user->invoice->first()->donations;
                $user['organization'] = $user->invoice->first()->organization;
            }
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
    public function update(InvoiceUpdateRequest $request, Invoice $invoice)
    {
        $invoice->update($request->validated());
        return response()->json($invoice, 202);
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
