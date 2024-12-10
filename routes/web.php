<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PhoneController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', function () {
    return redirect('/welcome');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::prefix('/client/shop')->middleware(['auth', 'clientValidation'])->name('client.')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('shop');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'roleValidation'])->name('dashboard');

Route::prefix('/dashboard/phones')->name('phones.')->middleware(['auth', 'adminValidation'])->group(function () {
    Route::get('/', [PhoneController::class, 'index'])->name('dashboard'); // Ruta: phones.dashboard
    Route::prefix('/create')->name('store.')->group(function () {
        Route::get('/', [PhoneController::class, 'showStore'])->name('show'); // Ruta: phones.store.show
        Route::post('/', [PhoneController::class, 'store']);
    });
    Route::prefix('/{slug}')->name('update.')->group(function () {
        Route::get('/', [PhoneController::class, 'showUpdate'])->name('show'); // Ruta: phones.update.show
        Route::put('/', [PhoneController::class, 'update']);
    });
    Route::prefix('/{slug}/delete')->name('delete')->group(function () {
        Route::delete('/', [PhoneController::class, 'destroy']); // Ruta: phones.delete
    });
    Route::prefix('/{slug}/show')->name('show')->group(function () {
        Route::get('/', [PhoneController::class, 'show']); // Ruta: phones.show
    });
});

Route::prefix('/dashboard/categories')->name('categories.')->middleware(['auth', 'adminValidation'])->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('dashboard'); // categories.dashboard

    // Route::prefix('/create')->name('store.')->group(function () {
    //     Route::get('/', [CategoryController::class, 'show'])->name('show'); // categories.store.show
    // });
});

require __DIR__.'/auth.php';
