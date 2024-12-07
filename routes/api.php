<?php

use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\WatchApiController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::resource('watches', WatchApiController::class);
Route::resource('categories', CategoryApiController::class);