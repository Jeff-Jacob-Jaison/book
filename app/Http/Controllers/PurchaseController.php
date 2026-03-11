<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Auth::user()->purchases()->with('book')->latest()->get();
        return \Inertia\Inertia::render('Purchases/Index', ['purchases' => $purchases]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ]);

        if (Auth::id() != $validated['user_id']) {
            abort(403, 'Unauthorized Checkout Action');
        }

        $book = Book::findOrFail($validated['book_id']);

        if ($book->type !== 'E-Book') {
            return back()->with('error', 'Only E-Books can be digitally purchased via this gateway.');
        }

        if ($book->price <= 0) {
            return back()->with('error', 'This E-Book is free to borrow.');
        }

        // Check if the user already bought this specifically
        $alreadyOwned = Purchase::where('user_id', $validated['user_id'])
            ->where('book_id', $validated['book_id'])
            ->exists();

        if ($alreadyOwned) {
            return back()->with('error', 'You already own this digital content. You cannot purchase it twice.');
        }

        // Assume virtual payment integration succeeds here...
        $amountPaid = $book->price;
        $commissionEarned = round($amountPaid * 0.20, 2);

        // Record the transaction
        Purchase::create([
            'user_id' => $validated['user_id'],
            'book_id' => $book->id,
            'amount_paid' => $amountPaid,
            'commission_earned' => $commissionEarned,
        ]);

        // Reward the Uploader their 20% passive commission
        if ($book->uploader) {
            $book->uploader->increment('balance', $commissionEarned);
        }

        return redirect()->back()->with('success', 'Digital content unlocked! A receipt has been generated.');
    }
}
