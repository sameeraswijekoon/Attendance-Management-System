<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validate form data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Store contact data in the database
        Contact::create($validated);

        // Send email
        Mail::raw($validated['message'], function ($mail) use ($validated) {
            $mail->from('sameerasw99@gmail.com', 'StudentAttendance')
                 ->to($validated['email'])
                 ->subject('Contact Form Submission')
                 ->replyTo('sameerasw99@gmail.com');
        });

        // Redirect back with success message
        return redirect()->route('contact.form')->with('success', 'Message sent successfully!');
    }
}
