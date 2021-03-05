<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Invoice as Transact;
use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionReceipt;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $transacts = Transact::with(['organization','user' => fn($user)=>$user->withoutGlobalScopes()])->latest();

        if($search = $request->get('search')) {
            $transacts->where('charge_id', 'like', '%'.$search.'%')
                ->orWhereHas('organization', fn($org) => $org->where('organizations.name', 'like', '%'.$search.'%'))
                ->orWhereHas('user', fn($user) => $user->where('users.name', 'like', '%'.$search.'%')->orWhere('users.email', 'like', '%'.$search.'%') )
                ;
        }

        return TransactionResource::collection($transacts->paginate($request->get('per_page') ?? 15));
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
        // dd('halo', $request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Invoice  $transact
     * @return \Illuminate\Http\Response
     */
    public function show(Transact $transact)
    {
        $transact->loadMissing(['organization', 'model', 'user']);

        // dd($transacts->get());
        return new TransactionResource($transact);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoice  $transact
     * @return \Illuminate\Http\Response
     */
    public function edit(Transact $transact)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $transact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transact $transact)
    {
        //
        // dd('update', $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $transact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transact $transact)
    {
        // dd('deleting', $request->all());
    }

    public function sendInvoice(Transact $transact)
    {
        $organization = $transact->organization()->first();
        $transact->loadMissing(['user' => fn($usr) => $usr->withoutGlobalScopes()]);

        $transacts = 'Amount';

        switch ($transact->model_type) {
            case 'App\Need':
                $transacts = 'Donation on need#'. $transact->model_id;
                break;
            default:
                break;
        }

        dispatch(fn() => Mail::to($transact->user)->send(new TransactionReceipt($organization, [  $transacts => $transact->amount ?? 0 ])) );

        return response()->json('Receipt will be sent to email shortly', 200);
    }
}
