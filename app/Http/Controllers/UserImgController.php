<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserImg;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Timetable;

class UserImgController extends Controller
{
    // Display user timetable
    public function index()
    {
        $user = Auth::user();

        // Check if the user is assigned to a course
        if (!$user->course_id) {
            return Inertia::render('UserTimetable', [
                'message' => 'No course assigned to your account.',
                'course' => null,
                'timetables' => null,
            ]);
        }

        $course = Course::find($user->course_id);

        // Fetch timetables related to the user's course and include subject data
        $timetables = Timetable::where('course_id', $user->course_id)
            ->with('subject', 'course') // Ensure both subject and course relationships are loaded
            ->get()
            ->groupBy(['day', 'time']);

        // Reformat the timetable data for easier access in the front-end
        $formattedTimetables = [];
        foreach ($timetables as $day => $timeSlots) {
            foreach ($timeSlots as $time => $entries) {
                $subject = $entries->first()->subject;
                $formattedTimetables[$day][$time] = [
                    'subject' => $subject ? [
                        'id' => $subject->id,
                        'name' => $subject->name,
                    ] : null,
                    'course' => $course, // Include the course data
                ];
            }
        }

        return Inertia::render('UserTimetable', [
            'course' => $course,
            'timetables' => $formattedTimetables,
        ]);
    }

    // Store captured image and its details
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|string',  // Ensure the image is a base64 encoded string
            'course_id' => 'required|exists:courses,id',
            'day' => 'required|string',
            'time' => 'required|string',
        ]);

        // Decode the base64 image string
        $user = Auth::user();
        $imageData = str_replace('data:image/jpeg;base64,', '', $request->image); // Assuming the image is JPEG
        $imageData = base64_decode($imageData);

        // Generate a unique name for the image
        $imageName = 'user_' . $user->id . '_' . time() . '.jpg';

        // Store the image in the 'public/user_images' directory
        $path = 'user_images/' . $imageName;
        Storage::disk('public')->put($path, $imageData); // Save the image data to the storage

        // Create a record in the database to associate the image with the user
        UserImg::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
            'image_path' => $path,  // Store the path to the image
            'day' => $request->day,
            'time' => $request->time,
        ]);

        return redirect()->back()->with('success', 'Image captured and saved successfully.');
    }

    // Capture image page (for displaying timetable and available slots)
    public function capture(Request $request)
    {
        $courses = Course::all();
        $timetable = Timetable::with(['course', 'subject'])->get();

        // Collect unique days and times from the timetable
        $uniqueDays = $timetable->pluck('day')->unique()->values()->toArray();
        $uniqueTimes = $timetable->pluck('time')->unique()->values()->toArray();

        // Handle manual time input
        $manualDay = $request->input('day', $uniqueDays[0]); // Default to first day
        $manualTime = $request->input('time', $uniqueTimes[0]); // Default to first time
        $manualActiveSlots = $timetable->filter(function ($slot) use ($manualDay, $manualTime) {
            return $slot->day === $manualDay && $slot->time === $manualTime;
        });

        // Pass data to the front-end
        return Inertia::render('CaptureImage', [
            'courses' => $courses,
            'timetable' => $timetable,
            'uniqueDays' => $uniqueDays,
            'uniqueTimes' => $uniqueTimes,
            'manualActiveSlots' => $manualActiveSlots,
            'manualDay' => $manualDay,
            'manualTime' => $manualTime,
        ]);
    }

}
