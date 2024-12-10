<?php

use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\PhoneApiController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::resource('phones', PhoneApiController::class);
Route::resource('categories', CategoryApiController::class);