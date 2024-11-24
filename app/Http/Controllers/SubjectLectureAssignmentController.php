<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Lecture;
use App\Models\SubjectLectureAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubjectLectureAssignmentController extends Controller
{
    // Show the form and table with previous assignments
    public function index()
    {
        $subjects = Subject::all();
        $lectures = Lecture::all();
        $assignments = SubjectLectureAssignment::with(['subject', 'lecture', 'coordinator'])->get();

        return Inertia::render('LectureSubject', [
            'subjects' => $subjects,
            'lectures' => $lectures,
            'assignments' => $assignments,
        ]);
    }

    // Handle form submission to assign a subject to a lecture
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id|unique:subject_lecture_assignments,subject_id',
            'lecture_id' => 'required|exists:lectures,id',
        ]);

        SubjectLectureAssignment::create([
            'subject_id' => $request->subject_id,
            'lecture_id' => $request->lecture_id,
            'coordinator_id' => Auth::id(), // Assign the current user's ID as the coordinator
        ]);

        return redirect()->back()->with('success', 'Subject successfully assigned to lecture.');
    }
}
