<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use Inertia\Inertia;

Route::get('/', [PageController::class,"showLandingPage"]/*function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);*/
);

use App\Http\Controllers\BookController;
use App\Http\Controllers\LendingController;
use App\Http\Controllers\FineController;
use App\Http\Controllers\BookForSaleController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Admin & Librarian Routes
    Route::middleware('role:Admin,Librarian')->group(function () {
        Route::resource('books', BookController::class)->except(['index', 'show']);
        Route::post('/lendings/{lending}/return', [LendingController::class, 'returnBook'])->name('lendings.return');
        Route::post('/marketplace/{bookForSale}/moderate', [BookForSaleController::class, 'moderate'])->name('marketplace.moderate');
       // Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    });

    // routes available to all authenticated users
    Route::resource('books', BookController::class)->only(['index', 'show']);
    Route::resource('lendings', LendingController::class)->only(['index', 'store']);
    Route::resource('fines', FineController::class)->only(['index', 'update']);
    Route::resource('marketplace', BookForSaleController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');

//Route::get("/landing",[PageController::class,"showLandingPage"]);
require __DIR__.'/auth.php';
