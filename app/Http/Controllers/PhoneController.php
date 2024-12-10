<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Phone;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;

class PhoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Phone/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function showStore()
    {
        $categories = Category::all();

        return Inertia::render('Phone/create', [
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

        if ($request->hasFile('url_imagen')) {
            $file = $request->file('url_imagen');

            $extension = $file->getClientOriginalExtension();

            if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid file extension',
                ], 400);
            }

            $fileName = time() . '_' . $file->getClientOriginalName();

            $filePath = $file->storeAs('url_imagens', $fileName, 'public');
            $fileUrl = asset('storage/' . $filePath);

            $validated['url_imagen'] = $fileUrl;
        }

        $phone = Phone::create($validated);

        Mail::to('luz.3801810370@ucaldas.edu.co')
            ->send(new \App\Mail\ProductCreatedMail($phone));


        return redirect()->route('phones.dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Phone $slug)
    {
        $categories = Category::all()->toArray();

        return Inertia::render('Phone/create', [
            'categories' => $categories,
            'product' => $slug,
            'readonly' => true
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showUpdate(Phone $slug)
    {
        $categories = Category::all();

        return Inertia::render('Phone/create', [
            'categories' => $categories,
            'product' => $slug,
            'readonly' => false
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Phone $slug)
    {
        $validated = $request->validated();

        if ($request->hasFile('url_imagen')) {
            $file = $request->file('url_imagen');
            $extension = $file->getClientOriginalExtension();

            if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid file extension',
                ], 400);
            }

            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('images', $fileName, 'public');
            $validated['url_imagen'] = asset('storage/' . $filePath);
        }

        $slug->update($validated);

        return redirect()->route('phones.dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Phone $slug)
    {
        $slug->delete();

        return redirect()->route('phones.dashboard');
    }
}
