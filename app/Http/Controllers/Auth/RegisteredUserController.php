<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Year;
use App\Models\Course;
use App\Models\Faculty;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view with required data.
     */
    public function create(): Response
    {
        // Load badges, courses, and faculties and pass them to the view
        return Inertia::render('Auth/Register', [
            'badges' => Year::all(), // Assuming badges are stored in 'years' table
            'courses' => Course::all(),
            'faculties' => Faculty::all(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:Student,Lecturer,Coordinator',
            'badge_id' => 'nullable|exists:years,id',
            'course_id' => 'nullable|exists:courses,id',
            'faculty_id' => 'nullable|exists:faculties,id',
            'year_id' => 'nullable|exists:years,id',
        ]);

        // Create user with conditional fields based on role
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'badge_id' => $request->role === 'Student' ? $request->badge_id : null,
            'course_id' => $request->role === 'Student' ? $request->course_id : null,
            'faculty_id' => $request->role !== 'Coordinator' ? $request->faculty_id : null,
            'year_id' => $request->role === 'Student' ? $request->year_id : null,
        ]);

        // Trigger registered event if needed
        event(new Registered($user));

        // Redirect based on user role
        $redirectRoute = match ($user->role) {
            'Student' => 'user-dashboard', // Route for student dashboard
            'Lecturer', 'Coordinator' => 'dashboard', // Route for lecturer/coordinator dashboard
            default => 'user-dashboard', // Default route if role isn't matched
        };

        // Return with redirect based on role
        return redirect()->route($redirectRoute);
    }
}
