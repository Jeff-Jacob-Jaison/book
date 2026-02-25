<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class LendingController extends Controller
{
    public function index(Request $request)
    {
        $query = Lending::with(['book', 'user']);

        // Members can only see their own lendings
        if ($request->user()->role->name === 'Member') {
            $query->where('user_id', $request->user()->id);
        }

        return Inertia::render('Lendings/Index', ['lendings' => $query->latest()->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $book = Book::findOrFail($validated['book_id']);

        if ($book->available_qty < 1) {
            return back()->with('error', 'Book is not available.');
        }

        $book->decrement('available_qty');

        Lending::create([
            'user_id' => $validated['user_id'],
            'book_id' => $book->id,
            'due_date' => Carbon::now()->addDays(14),
            'status' => 'borrowed',
        ]);

        return redirect()->route('lendings.index')->with('success', 'Book issued successfully.');
    }

    public function returnBook(Request $request, Lending $lending)
    {
        if ($lending->status === 'returned') {
            return back()->with('error', 'Book already returned.');
        }

        $lending->update([
            'returned_at' => Carbon::now(),
            'status' => 'returned',
        ]);

        $lending->book->increment('available_qty');

        // Check for fine (Assume $1 per overdue day)
        if (Carbon::now()->gt($lending->due_date)) {
            $daysOverdue = Carbon::now()->diffInDays($lending->due_date);
            $lending->fine()->create([
                'user_id' => $lending->user_id,
                'amount' => $daysOverdue * 1.00,
            ]);
        }

        return redirect()->back()->with('success', 'Book returned. Fines calculated if any.');
    }
}
