<?php

// QRCodeController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Subject;
use Illuminate\Routing\Controller;



class QRCodeController extends Controller
{
    // Show form to select course, subject, and date
    public function showForm()
    {
        $courses = Course::all();
        $subjects = Subject::all();

        return Inertia::render('GenerateQRCode2', [
            'courses' => $courses,
            'subjects' => $subjects,
        ]);
    }

    // Generate QR Code based on selected course, subject, and date
    public function generate(Request $request)
    {
        // Validate that course_id and subject_id are provided and exist
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'subject_id' => 'required|exists:subjects,id',
            'date' => 'required|date',
        ]);

        // Retrieve course and subject based on IDs
        $course = Course::findOrFail($request->course_id);
        $subject = Subject::findOrFail($request->subject_id);
        $date = $request->date;

        // Data to encode in QR code
        $data = [
            'course_id' => $course->id,
            'subject_id' => $subject->id,
            'date' => $date,
        ];

        // Generate the QR code as a base64 PNG
        $qrCode = base64_encode(QrCode::format('png')->size(200)->generate(json_encode($data)));

        // Render the Inertia view with the QR code data
        return Inertia::render('GenerateQRCode2', [
            'course' => $course,
            'subject' => $subject,
            'date' => $date,
            'qrCode' => $qrCode,
            'courses' => Course::all(),
            'subjects' => Subject::all(),
        ]);
    }
}
