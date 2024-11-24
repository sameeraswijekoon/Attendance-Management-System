<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Course;
use App\Models\Faculty;
use App\Models\Year;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        // Fetch students with their relationships
        $students = Student::with(['course', 'faculty', 'year'])->get();

        return Inertia::render('StudentManagement', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        $courses = Course::all();
        $faculties = Faculty::all();
        $years = Year::all();

        return Inertia::render('StudentForm', [
            'courses' => $courses,
            'faculties' => $faculties,
            'years' => $years,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'student_id' => 'required|string|unique:students,student_id',
            'course_id' => 'required|exists:courses,id',
            'faculty_id' => 'required|exists:faculties,id',
            'year_id' => 'required|exists:years,id',
            'badge_id' => 'nullable|exists:years,id',
        ]);

        Student::create($validated);

        return redirect()->route('students.index')->with('success', 'Student added successfully.');
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);
        $courses = Course::all();
        $faculties = Faculty::all();
        $years = Year::all();

        return Inertia::render('StudentForm', [
            'student' => $student,
            'courses' => $courses,
            'faculties' => $faculties,
            'years' => $years,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $id,
            'student_id' => 'required|string|unique:students,student_id,' . $id,
            'course_id' => 'required|exists:courses,id',
            'faculty_id' => 'required|exists:faculties,id',
            'year_id' => 'required|exists:years,id',
            'badge_id' => 'required|exists:years,id',
        ]);

        $student = Student::findOrFail($id);
        $student->update($validated);

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }
}
