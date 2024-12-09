<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Watch;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;

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
        $categories = Category::all();

        return Inertia::render('Watch/create', [
            'categories' => $categories,
            'product' => [],
            'readonly' => false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $extension = $file->getClientOriginalExtension();

           if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid file extension',
                ], 400);
            }

            $fileName = time() . '_' . $file->getClientOriginalName();

            $filePath = $file->storeAs('images', $fileName, 'public');
            $fileUrl = asset('storage/' . $filePath);

            $validated['image'] = $fileUrl;
        }

        $watch = Watch::create($validated);

        Mail::to(env('MAIL_FROM_ADDRESS'))
            ->send(new \App\Mail\ProductCreatedMail($watch));


        return redirect()->route('watches.dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Watch $slug)
    {
        $categories = Category::all()->toArray();

        return Inertia::render('Watch/create', [
            'categories' => $categories,
            'product' => $slug,
            'readonly' => true
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showUpdate(Watch $slug)
    {
        $categories = Category::all();

        return Inertia::render('Watch/create', [
            'categories' => $categories,
            'product' => $slug,
            'readonly' => false
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Watch $slug)
    {
        $validated = $request->validated();

        $slug->update($validated);

        return redirect()->route('watches.dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Watch $slug)
    {
        $slug->delete();

        return redirect()->route('watches.dashboard');
    }
}
