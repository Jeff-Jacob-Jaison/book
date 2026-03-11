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

Route::get('/about', [PageController::class, 'showAboutPage'])->name('about');
Route::get('/services', [PageController::class, 'showServicesPage'])->name('services');
Route::get('/contact', [PageController::class, 'showContactPage'])->name('contact');
Route::get('/collection', [PageController::class, 'showCollectionPage'])->name('collection');

use App\Http\Controllers\BookController;
use App\Http\Controllers\LendingController;
use App\Http\Controllers\FineController;
use App\Http\Controllers\BookForSaleController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\WishlistController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Librarian Routes
    Route::middleware('role:Librarian')->group(function () {
        Route::patch('/books/{book}/moderate', [BookController::class, 'moderate'])->name('books.moderate');
        Route::resource('books', BookController::class)->except(['index', 'show']);
        Route::post('/marketplace/{bookForSale}/moderate', [BookForSaleController::class, 'moderate'])->name('marketplace.moderate');
       // Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    });

    // routes available to all authenticated users
    Route::resource('books', BookController::class)->only(['index', 'show']);
    Route::resource('lendings', LendingController::class)->only(['index', 'store']);
    Route::post('/lendings/{lending}/return', [LendingController::class, 'returnBook'])->name('lendings.return');
    Route::resource('fines', FineController::class)->only(['index', 'update']);
    Route::resource('marketplace', BookForSaleController::class);
    
    // Member E-Book Submissions & Purchases
    Route::resource('submissions', SubmissionController::class)->except(['show']);
    Route::post('/submissions/withdraw', [SubmissionController::class, 'withdraw'])->name('submissions.withdraw');
    
    Route::resource('purchases', PurchaseController::class)->only(['index', 'store']);
    Route::resource('wishlists', WishlistController::class)->only(['index', 'store', 'destroy']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');

//Route::get("/landing",[PageController::class,"showLandingPage"]);
require __DIR__.'/auth.php';
