<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::latest()->get();
        return Inertia::render('Books/Index', ['books' => $books]);
    }

    public function create()
    {
        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn',
            'published_year' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $validated['available_qty'] = $validated['quantity'];
        Book::create($validated);

        return redirect()->route('books.index')->with('success', 'Book added successfully.');
    }

    public function show(Book $book)
    {
        return Inertia::render('Books/Show', ['book' => $book]);
    }

    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', ['book' => $book]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn,' . $book->id,
            'published_year' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $diff = $validated['quantity'] - $book->quantity;
        $validated['available_qty'] = $book->available_qty + $diff;

        $book->update($validated);

        return redirect()->route('books.index')->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}
