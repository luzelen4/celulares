<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Watch;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class WatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        return Inertia::render('Watch/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function showStore()
    {
        return Inertia::render('Watch/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        Watch::create($validated);

        return redirect()->route('watches.dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Watch $watch)
    {
        $categories = Category::all()->toArray();

        return Inertia::render('Watch/create', [
            'categories' => $categories,
            'product' => $watch,
            'readonly' => true
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showUpdate(Watch $watch)
    {
        $categories = Category::all();

        return Inertia::render('Watch/create', [
            'categories' => $categories,
            'product' => $watch,
            'readonly' => false
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Watch $watch)
    {
        $validated = $request->validated();
        
        $watch->update($validated);

        return redirect()->route('watches.dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Watch $watch)
    {
        $watch->delete();

        return redirect()->route('watches.dashboard');
    }
}
