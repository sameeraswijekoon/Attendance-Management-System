<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Year;
use App\Models\Course;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserAddController extends Controller
{
    /**
     * Show the user creation form with the necessary data.
     */
    public function create(): Response
    {
        return Inertia::render('UserAdd', [
            'badges' => Year::all(),
            'courses' => Course::all(),
            'faculties' => Faculty::all(),
        ]);
    }

    /**
     * Store the new user in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:Student,Lecturer,Coordinator',
            'badge_id' => 'nullable|exists:years,id',
            'course_id' => 'nullable|exists:courses,id',
            'faculty_id' => 'nullable|exists:faculties,id',
            'year_id' => 'nullable|exists:years,id',
        ]);

        // Create the new user with the specified role and details
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'badge_id' => $request->role === 'Student' ? $request->badge_id : null,
            'course_id' => $request->role === 'Student' ? $request->course_id : null,
            'faculty_id' => $request->role !== 'Coordinator' ? $request->faculty_id : null,
            'year_id' => $request->role === 'Student' ? $request->year_id : null,
        ]);

        return redirect()->route('dashboard')->with('success', 'User added successfully');
    }
}
