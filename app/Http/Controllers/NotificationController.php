<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    // Display all notifications
    public function index()
    {
        $notifications = Notification::all();
        return Inertia::render('Notification', ['notifications' => $notifications]);
    }

    // Store a new notification
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Notification::create($request->only('subject', 'author', 'description'));

        return redirect()->back()->with('success', 'Notification created successfully.');
    }

    // Update an existing notification
    public function update(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $notification = Notification::findOrFail($id);
        $notification->update($request->only('subject', 'author', 'description'));

        return redirect()->back()->with('success', 'Notification updated successfully.');
    }

    // Delete a notification
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return redirect()->back()->with('success', 'Notification deleted successfully.');
    }

    // User view of notifications
    public function userIndex()
    {
        $notifications = Notification::all();
        return Inertia::render('UserNotification', ['notifications' => $notifications]);
    }
}
