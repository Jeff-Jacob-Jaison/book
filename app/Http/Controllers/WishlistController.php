<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlists = $request->user()->wishlists()
            ->with(['book', 'bookForSale'])
            ->latest()
            ->get();

        return Inertia::render('Wishlists/Index', [
            'wishlists' => $wishlists
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'nullable|exists:books,id',
            'book_for_sale_id' => 'nullable|exists:book_for_sales,id',
        ]);

        if (empty($validated['book_id']) && empty($validated['book_for_sale_id'])) {
            return back()->with('error', 'Must specify an item to wishlist.');
        }

        // Check if already wishlisted
        $query = $request->user()->wishlists();
        if (!empty($validated['book_id'])) {
            $query->where('book_id', $validated['book_id']);
        } else {
            $query->where('book_for_sale_id', $validated['book_for_sale_id']);
        }

        if ($query->exists()) {
            return back()->with('error', 'Item is already in your wishlist.');
        }

        $request->user()->wishlists()->create($validated);

        return back()->with('success', 'Added to wishlist.');
    }

    public function destroy(Request $request, Wishlist $wishlist)
    {
        // Ensure user owns the wishlist item
        if ($wishlist->user_id !== $request->user()->id) {
            abort(403);
        }

        $wishlist->delete();

        return back()->with('success', 'Removed from wishlist.');
    }
}
