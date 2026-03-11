<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;

class PageController extends Controller
{
    public function showLandingPage()
    {
        return Inertia::render('landing');
    }

    public function showAboutPage()
    {
        return Inertia::render('About');
    }

    public function showServicesPage()
    {
        return Inertia::render('Services');
    }

    public function showContactPage()
    {
        return Inertia::render('Contact');
    }

    public function showCollectionPage()
    {
        $books = Book::where('status', 'approved')->get();
        $purchasedBookIds = [];

        if (auth()->check()) {
            $purchasedBookIds = auth()->user()->purchases()->pluck('book_id')->toArray();
        }

        return Inertia::render('Collection', [
            'books' => $books,
            'purchasedBookIds' => $purchasedBookIds
        ]);
    }
}
