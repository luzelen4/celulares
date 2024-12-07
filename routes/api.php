<?php

use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\WatchApiController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::prefix('/')->middleware(['auth:api'])->name('api.')->group(function () {
//     // Route::get('/', [ClientController::class, 'index'])->name('shop');
//     // Route::get('/', [WatchController::class, 'index'])->name('shop');

//     // Route::get('/prueba', function () {
//     //     return 'Hola Mundo';
//     // });

//     // Route::post('/prueba', function () {
//     //     return 'login';
//     // });
// });

Route::resource('watches', WatchApiController::class);
Route::resource('categories', CategoryApiController::class);