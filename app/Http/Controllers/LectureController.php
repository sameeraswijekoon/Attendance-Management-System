<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LectureController extends Controller
{
    public function index()
    {
        $lectures = Lecture::all();
        return Inertia::render('LectureManagement', ['lectures' => $lectures]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lecture_name' => 'required|string|max:255',
            'lecture_id' => 'required|string|unique:lectures,lecture_id|max:10',
        ]);

        Lecture::create($validated);
        return redirect()->back()->with('success', 'Lecture added successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'lecture_name' => 'required|string|max:255',
            'lecture_id' => 'required|string|max:10|unique:lectures,lecture_id,' . $id,
        ]);

        $lecture = Lecture::findOrFail($id);
        $lecture->update($validated);

        return redirect()->back()->with('success', 'Lecture updated successfully.');
    }

    public function destroy($id)
    {
        Lecture::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Lecture deleted successfully.');
    }
}
