<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Phone;
use Illuminate\Http\Request;
use Exception;

class PhoneApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $phones = Phone::with(['categories' => function ($query) {
                $query->whereNotNull('categories.cod_categoria');
            }])->get();

            return response()->json($phones);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
