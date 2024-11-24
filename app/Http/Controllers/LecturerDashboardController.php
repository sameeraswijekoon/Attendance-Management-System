<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LecturerDashboardController extends Controller
{
    public function index()
    {
        // Here you can pass any required data to the dashboard view.
        // For example:
        // $attendanceRecords = AttendanceRecord::where('user_role', 'lecturer')->get();

        return Inertia::render('LecturerDashboard', [
            // 'attendanceRecords' => $attendanceRecords,
            // You can add additional data here if needed
        ]);
    }
}
