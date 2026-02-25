<?php

namespace App\Http\Controllers;

use App\Models\BookForSale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookForSaleController extends Controller
{
    public function index()
    {
        $books = BookForSale::with('user')
            ->where('status', 'approved')
            ->latest()
            ->get();
            
        return Inertia::render('Marketplace/Index', ['books' => $books]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'condition' => 'required|string|in:New,Like New,Good,Acceptable',
        ]);

        $request->user()->booksForSale()->create($validated);

        return redirect()->route('marketplace.index')->with('success', 'Book listed for sale and pending approval.');
    }

    public function show(BookForSale $bookForSale)
    {
        if ($bookForSale->status !== 'approved' && auth()->user()->role->name === 'Member' && $bookForSale->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Marketplace/Show', ['book' => $bookForSale->load('user')]);
    }

    public function update(Request $request, BookForSale $bookForSale)
    {
        if ($request->user()->id !== $bookForSale->user_id && $request->user()->role->name === 'Member') {
            abort(403);
        }

        $validated = $request->validate([
            'price' => 'numeric|min:0',
            'description' => 'string',
            'condition' => 'string|in:New,Like New,Good,Acceptable',
        ]);

        $bookForSale->update($validated);

        return redirect()->route('marketplace.show', $bookForSale)->with('success', 'Listing updated successfully.');
    }

    public function destroy(Request $request, BookForSale $bookForSale)
    {
        if ($request->user()->id !== $bookForSale->user_id && $request->user()->role->name === 'Member') {
            abort(403);
        }

        $bookForSale->delete();

        return redirect()->route('marketplace.index')->with('success', 'Listing deleted successfully.');
    }

    public function moderate(Request $request, BookForSale $bookForSale)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $bookForSale->update($validated);

        return redirect()->back()->with('success', 'Listing ' . $validated['status'] . ' successfully.');
    }
}
