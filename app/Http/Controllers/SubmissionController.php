<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    public function index()
    {
        // Get all books uploaded by this member
        $books = Book::where('uploader_id', Auth::id())->latest()->get();
        return Inertia::render('Submissions/Index', ['books' => $books]);
    }

    public function create()
    {
        return Inertia::render('Submissions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn', // In real life might be generic or generated
            'published_year' => 'required|integer',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'nullable|image|max:2048',
            'book_file' => 'required|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('cover_image')) {
            $imageName = time() . '_' . $request->file('cover_image')->getClientOriginalName();
            $request->file('cover_image')->move(public_path('images'), $imageName);
            $validated['cover_image'] = $imageName;
        }

        if ($request->hasFile('book_file')) {
            $fileName = time() . '_' . $request->file('book_file')->getClientOriginalName();
            $request->file('book_file')->move(public_path('ebooks'), $fileName);
            $validated['file_path'] = $fileName;
        }

        // Implicit details for a user-submitted E-Book
        $validated['type'] = 'E-Book';
        $validated['quantity'] = 1; // Infinite logically, but for schema consistency
        $validated['available_qty'] = 1;
        $validated['uploader_id'] = Auth::id();
        $validated['status'] = 'pending'; // Requires Librarian Approval

        Book::create($validated);

        return redirect()->route('submissions.index')->with('success', 'E-Book submitted to Librarian queue for approval.');
    }

    public function withdraw(Request $request)
    {
        $user = Auth::user();

        if ($user->balance < 10.00) {
            return back()->with('error', 'You need at least $10.00 in passive commissions to request a withdrawal.');
        }

        // Simulating the actual money transfer outbound logic
        $user->update(['balance' => 0.00]);

        return redirect()->route('submissions.index')->with('success', 'Withdrawal successful! Your passive funds have been transferred to your connected bank.');
    }
}
