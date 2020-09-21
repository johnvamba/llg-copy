<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationCategoryStoreRequest;
use App\Http\Requests\OrganizationCategoryUpdateRequest;
use Illuminate\Http\Request;
use App\OrganizationCategory;

class OrganizationCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = OrganizationCategory::where('status', true)
            ->get();

        return response()->json($categories);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCategories(Request $request)
    {
        $request['columns'] = ['id','name'];

        $categories = OrganizationCategory::where('status', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->chunk($request->limit);

        $request['data'] = $categories;
        $request['module'] = [
            'path' => '/organization/category',
            'singular' => 'category',
            'plural' => 'categories',
            'endpoint' => 'organizations-categories',
        ];

        return response()->json($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrganizationCategoryStoreRequest $request)
    {
        $category = OrganizationCategory::create(request()->only('name'));

        return response()->json($category, 202);
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
    public function update(
        OrganizationCategoryUpdateRequest $request, 
        OrganizationCategory $organizationCategory
    ) {
        $organizationCategory->update($request->validated());
        return response()->json($organizationCategory, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrganizationCategory $organizationCategory)
    {
        try {
            $organizationCategory->update(['status' => false]);
            
            return response()->json([
                    'message' => 'Category successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
