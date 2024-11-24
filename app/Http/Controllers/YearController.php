<?php
namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YearController extends Controller
{
    public function index()
    {
        $years = Year::all();
        return Inertia::render('YearManagement', ['years' => $years]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:4',
            'badge_number' => 'required|string|max:255',
        ]);

        Year::create($validated);

        return redirect()->back()->with('success', 'Year and Badge Number added successfully.');
    }

    public function destroy($id)
    {
        Year::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Year and Badge Number deleted successfully.');
    }
}
