<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseAndFacultyController extends Controller
{
    public function create()
    {
        return Inertia::render('AddCourseAndFaculty');
        return Inertia::render('FacultyList');
    }

    public function createFaculty()
    {
        return Inertia::render('AddFaculty');
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10',
        ]);

        Course::create($validated);

        return redirect()->back()->with('success', 'Course added successfully.');
    }

    public function storeFaculty(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Faculty::create($validated);

        return redirect()->back()->with('success', 'Faculty has been created successfully.');
    }
}
