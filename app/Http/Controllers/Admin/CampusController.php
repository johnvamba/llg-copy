<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CampusResource;

use App\Campus;
use DB;

class CampusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $campus = Campus::withCount('organizations')->latest()->get();

        return CampusResource::collection($campus);
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
            'name' => 'required',
            'description'=> 'required',
            'location' => 'required',
            'lng' => 'required',
            'lat' => 'required',
            // 'photo' => 
        ]);

        DB::beginTransaction();
        try {
            $campus = Campus::create( $request->only('name', 'location', 'lng', 'lat') ); //add description here
            //add photo here

            DB::commit();
            return new CampusResource($campus);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function show(Campus $campus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function edit(Campus $campus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Campus $campus)
    {
        $request->validate([
            'name' => 'required',
            'description'=> 'required',
            'location' => 'required',
            'lng' => 'required',
            'lat' => 'required',
            // 'photo' => 
        ]);

        DB::beginTransaction();
        try {
            $campus->fill( $request->only('name', 'location', 'lng', 'lat') ); //add description here
            //add photo here
            
            $campus->save();
            DB::commit();
            return new CampusResource($campus);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['errors'=>$e->getMessage()], 400);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Campus $campus
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campus $campus)
    {
        //
    }
}
