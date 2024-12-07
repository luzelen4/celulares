<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WatchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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

// Route::get('/dashboard/watches', [WatchController::class, 'index'])->middleware(['auth'])->name('watches.dashboard');
// Route::get('/dashboard/watches/create', [WatchController::class, 'create'])->middleware(['auth'])->name('watches.store.show');
// Route::post('/dashboard/watches', [WatchController::class, 'store'])->middleware(['auth'])->name('watches.store.show');
// Route::get('/dashboard/watches/{watch}/edit', [WatchController::class, 'edit'])->middleware(['auth'])->name('watches.update.show');
// Route::put('/dashboard/watches/{watch}/edit', [WatchController::class, 'update'])->middleware(['auth']);

Route::prefix('/dashboard/watches')->name('watches.')->middleware(['auth', 'adminValidation'])->group(function () {
    Route::get('/', [WatchController::class, 'index'])->name('dashboard'); // watches.dashboard
    Route::prefix('/create')->name('store.')->group(function () {
        Route::get('/', [WatchController::class, 'showStore'])->name('show'); // watches.store.show
        Route::post('/', [WatchController::class, 'store']);
    });
    Route::prefix('/{slug}')->name('update.')->group(function () {
        Route::get('/', [WatchController::class, 'showUpdate'])->name('show'); // watches.update.show
        Route::put('/', [WatchController::class, 'update']);
    });
    Route::prefix('/{slug}/delete')->name('delete')->group(function () {
        Route::delete('/', [WatchController::class, 'destroy']); // watches.delete
    });
    Route::prefix('/{slug}/show')->name('show')->group(function () {
        Route::get('/', [WatchController::class, 'show']); // watches.show
    });
});

require __DIR__.'/auth.php';
