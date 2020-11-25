<?php

namespace App\Http\Controllers;

use App\Http\Requests\NeedsCategoryStoreRequest;
use App\Http\Requests\NeedsCategoryUpdateRequest;
use Illuminate\Http\Request;
use App\NeedsCategory;

class NeedsCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $type = '')
    {
        $categories = NeedsCategory::where('status', true);

        if (!empty($type))
            $categories->where('type', $type);
        
        $results = $categories->get();

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCategories(Request $request)
    {
        $request['columns'] = ['id','name'];

        $categories = NeedsCategory::where('status', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->chunk($request->limit);

        $request['data'] = $categories;
        $request['module'] = [
            'path' => '/needs/category',
            'singular' => 'category',
            'plural' => 'categories',
            'endpoint' => 'needs-categories',
        ];

        return response()->json($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NeedsCategoryStoreRequest $request)
    {
        $category = NeedsCategory::create(request()->only('name'));

        return response()->json($category, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(NeedsCategory $needsCategory)
    {
        return response()->json($needsCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NeedsCategoryUpdateRequest $request, NeedsCategory $needsCategory)
    {
        $needsCategory->update($request->validated());
        return response()->json($needsCategory, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(NeedsCategory $needsCategory)
    {
        try {
            $needsCategory->update(['status' => false]);
            
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
