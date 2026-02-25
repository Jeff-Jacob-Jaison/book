<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FineController extends Controller
{
    public function index(Request $request)
    {
        $query = Fine::with(['user', 'lending.book']);

        // Members can only see their own fines
        if ($request->user()->role->name === 'Member') {
            $query->where('user_id', $request->user()->id);
        }

        return Inertia::render('Fines/Index', ['fines' => $query->latest()->get()]);
    }

    public function update(Request $request, Fine $fine)
    {
        if ($request->user()->role->name === 'Member') {
            abort(403);
        }

        $fine->update(['paid' => true]);

        return redirect()->route('fines.index')->with('success', 'Fine marked as paid.');
    }
}
