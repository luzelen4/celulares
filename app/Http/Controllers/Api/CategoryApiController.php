<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;


class CategoryApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $watchs = Category::all();

            return response()->json($watchs);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
    * Remove the specified resource from storage.
    */
   final public function destroy(Category $category)
   {
       try {
           if ($category->delete()) {
               return response()->json(['message' => 'Registro eliminaado exitosamente'], 200);
           }
           return response()->json(['error' => 'Algo salió mal'], 500);
       } catch (Exception $e) {
           return response()->json(['error' => $e->getMessage()], 500);
       }
   }
}
