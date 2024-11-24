<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserTimetableController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->course_id) {
            return Inertia::render('UserTimetable', [
                'message' => 'No course assigned to your account.',
                'course' => null,
                'timetables' => null,
            ]);
        }

        $course = Course::find($user->course_id);

        // Fetch timetables by course_id with subject data
        $timetables = Timetable::where('course_id', $user->course_id)
            ->with('subject') // Ensure subject relationship is loaded
            ->get()
            ->groupBy(['day', 'time']);

        // Reformat data for easier access in the front end
        $formattedTimetables = [];
        foreach ($timetables as $day => $timeSlots) {
            foreach ($timeSlots as $time => $entries) {
                $subject = $entries->first()->subject;
                $formattedTimetables[$day][$time] = [
                    'subject' => $subject ? [
                        'id' => $subject->id,
                        'name' => $subject->name,
                    ] : null,
                ];
            }
        }

        return Inertia::render('UserTimetable', [
            'course' => $course,
            'timetables' => $formattedTimetables,
        ]);
    }
}
