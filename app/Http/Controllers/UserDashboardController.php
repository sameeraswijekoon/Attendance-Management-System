<?php

// app/Http/Controllers/UserDashboardController.php

namespace App\Http\Controllers;

use App\Models\MotivationQuote;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        // Fetch all quotes
        $quotes = MotivationQuote::all();

        // Pass quotes to the view
        return Inertia::render('UserDashboard', [
            'quotes' => $quotes,
        ]);
    }
}
