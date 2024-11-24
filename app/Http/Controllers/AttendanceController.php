<?php

namespace App\Http\Controllers;

use App\Models\AttendanceRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'subject_id' => 'required|exists:subjects,id',
            'date' => 'required|date',
        ]);

        AttendanceRecord::create([
            'user_id' => Auth::id(),
            'course_id' => $request->course_id,
            'subject_id' => $request->subject_id,
            'attendance_date' => $request->date,
        ]);

        return back()->with('success', 'Attendance recorded successfully.');
    }
    public function viewPersonalAttendance()
    {
        $user = Auth::user();

        // Fetch only the authenticated user's attendance records
        $attendanceRecords = AttendanceRecord::where('user_id', $user->id)
            ->with(['course', 'subject'])
            ->get();

        // Pass data to Inertia view
        return Inertia::render('UserPersonalAttendance', [
            'attendanceRecords' => $attendanceRecords,
        ]);
    }




    public function view()
{
    $attendanceRecords = AttendanceRecord::with(['user', 'course', 'subject'])->get();

    return inertia('ViewAttendance', [
        'attendanceRecords' => $attendanceRecords,
    ]);
}

}
