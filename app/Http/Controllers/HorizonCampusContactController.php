<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HorizonCampusContactController extends Controller
{
    // Show the contact form
    public function showContactForm()
    {
        return Inertia::render('ContactHorizonCampus');
    }

    // Handle the contact form submission
    public function submitContactForm(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Handle submission (e.g., save to the database, send email)
        // For now, we just return a success message
        return back()->with('success', 'Your message has been sent successfully.');
    }
}
