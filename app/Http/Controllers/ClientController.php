<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Phone;
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
         return Inertia::render('Clients/index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
}
