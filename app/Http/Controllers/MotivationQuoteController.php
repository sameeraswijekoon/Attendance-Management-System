<?php

namespace App\Http\Controllers;

use App\Models\MotivationQuote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MotivationQuoteController extends Controller
{
    // Display the list of quotes
    public function index()
    {
        $quotes = MotivationQuote::all();
        return Inertia::render('MotivationQuotes', ['quotes' => $quotes]);
    }

    // Store a new quote
    public function store(Request $request)
    {
        $request->validate([
            'author' => 'nullable|string|max:255',
            'quote' => 'required|string',
        ]);

        MotivationQuote::create($request->only(['author', 'quote']));
        return redirect()->back()->with('success', 'Quote added successfully.');
    }

    // Delete a quote
    public function destroy($id)
    {
        $quote = MotivationQuote::findOrFail($id);
        $quote->delete();

        return redirect()->back()->with('success', 'Quote deleted successfully.');
    }
    public function update(Request $request, $id)
    {
        $quote = MotivationQuote::findOrFail($id);

        $validated = $request->validate([
            'author' => 'nullable|string|max:255',
            'quote' => 'required|string',
        ]);

        $quote->update($validated);

        return redirect()->back()->with('success', 'Quote updated successfully.');
    }
}

