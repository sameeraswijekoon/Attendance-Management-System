<?php

// app/Http/Controllers/TimetableController.php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subject;
use App\Models\Timetable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\TimetableMail;
use Illuminate\Support\Facades\Mail; // Add this line

class TimetableController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        $subjects = Subject::select('id', 'name', 'code')->get();
        $timetables = Timetable::all();

        return Inertia::render('TimetablePage', [
            'courses' => $courses,
            'subjects' => $subjects,
            'timetables' => $timetables,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'day' => 'required|string',
            'time' => 'required|string',
            'subject_id' => 'nullable|exists:subjects,id',
        ]);

        Timetable::updateOrCreate(
            [
                'course_id' => $request->course_id,
                'day' => $request->day,
                'time' => $request->time,
            ],
            [
                'subject_id' => $request->subject_id,
            ]
        );

        return redirect()->back()->with('success', 'Timetable updated successfully.');
    }

    public function sendEmail($courseId)
    {
        $course = Course::with('timetables.subject')->findOrFail($courseId);
        $timetable = $course->timetables;

        // Send the email
        Mail::to(auth()->user()->email)->send(new TimetableMail($course, $timetable));

        return redirect()->route('timetable.index')->with('success', 'Timetable sent to your email.');
    }
    public function uploadScreenshot(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'course_id' => 'required|integer',
        ]);

        // Decode the base64 image
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data['image']));
        $fileName = 'timetables/' . uniqid() . '.png';

        // Store the image in the public storage directory
        Storage::disk('public')->put($fileName, $imageData);

        // Generate a public URL for the image
        $imageUrl = asset('storage/' . $fileName);

        // Create the WhatsApp message URL with the image URL
        $whatsappMessage = urlencode("Here's the timetable for the course: \n\n$imageUrl");
        $whatsappUrl = "https://wa.me/?text=$whatsappMessage";

        // Return the WhatsApp URL to the frontend
        return response()->json(['whatsappUrl' => $whatsappUrl]);
    }
}
