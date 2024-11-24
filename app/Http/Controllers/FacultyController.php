<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function index()
    {
        $faculties = Faculty::all();

        // Updated path to 'FacultyList' if it's located directly under 'Pages'
        return Inertia::render('ManageFaculties', [
            'faculties' => $faculties,
            'flash' => session('success'),
        ]);
    }

    // Store a new faculty
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ], [
            'name.required' => 'The faculty name is required.',
            'name.string' => 'The faculty name must be a string.',
            'name.max' => 'The faculty name may not be greater than 255 characters.',
        ]);

        Faculty::create($validated);

        return redirect()->route('faculties.index')->with('success', 'Faculty has been created successfully.');
    }

    // Update an existing faculty
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ], [
            'name.required' => 'The faculty name is required.',
            'name.string' => 'The faculty name must be a string.',
            'name.max' => 'The faculty name may not be greater than 255 characters.',
        ]);

        $faculty = Faculty::findOrFail($id);
        $faculty->update($validated);

        return redirect()->route('faculties.index')->with('success', 'Faculty updated successfully.');
    }

    // Delete a faculty
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();

        return redirect()->route('faculties.index')->with('success', 'Faculty deleted successfully.');
    }
}
