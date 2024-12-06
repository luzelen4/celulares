<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Watch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         // Obtener todas las categorías disponibles
         $categories = Category::all();
 
         // Si se selecciona una categoría, filtrar los productos
        //  $watches = Watch::whereHas('categories', function ($query) use ($request) {
        //      if ($request->has('category')) {
        //          $query->where('name', $request->category); // Filtrar por nombre de categoría
        //      }
        //  })->get();
        
        $watches = Watch::all();

         // Devolver la vista con los productos y las categorías
         return Inertia::render('Clients/index', [
            'categories' => $categories,
            'watches' => $watches
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
}
