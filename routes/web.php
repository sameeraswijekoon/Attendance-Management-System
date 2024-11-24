<?php

use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


use App\Http\Controllers\CourseAndFacultyController;

Route::get('/add-course-and-faculty', [CourseAndFacultyController::class, 'create'])->name('add.course.and.faculty');
Route::post('/courses', [CourseAndFacultyController::class, 'storeCourse']);
Route::post('/faculties', [CourseAndFacultyController::class, 'storeFaculty']);



Route::get('/add-course-and-faculty', [CourseAndFacultyController::class, 'create'])->name('add.course.and.faculty');



// New route for adding faculty
Route::get('/add-faculty', [CourseAndFacultyController::class, 'createFaculty'])->name('add.faculty');

// Route for storing faculty data
Route::post('/faculties', [CourseAndFacultyController::class, 'storeFaculty'])->name('faculties.store');



Route::get('/add-course-and-faculty', [CourseAndFacultyController::class, 'create'])->name('courses.create');
Route::post('/courses', [CourseAndFacultyController::class, 'storeCourse'])->name('courses.store');
Route::post('/faculties', [CourseAndFacultyController::class, 'storeFaculty'])->name('faculties.store');



Route::get('/faculties', [FacultyController::class, 'index'])->name('faculties.index');
Route::delete('/faculties/{id}', [FacultyController::class, 'destroy'])->name('faculties.destroy');
Route::post('/faculties', [FacultyController::class, 'store'])->name('faculties.store');
Route::put('/faculties/{id}', [FacultyController::class, 'update'])->name('faculties.update');
Route::get('/api/faculties', [FacultyController::class, 'getFaculties'])->name('faculties.api.index');
Route::get('/faculties', [FacultyController::class, 'index'])->name('faculties.index');

// routes/web.php

use App\Http\Controllers\LectureController;

Route::get('/lectures', [LectureController::class, 'index']);
Route::post('/lectures', [LectureController::class, 'store']);
Route::delete('/lectures/{id}', [LectureController::class, 'destroy']);
Route::get('/lectures', [LectureController::class, 'index'])->name('lectures.index');
Route::post('/lectures', [LectureController::class, 'store'])->name('lectures.store'); // Add a lecture
Route::put('/lectures/{id}', [LectureController::class, 'update'])->name('lectures.update'); // Update a lecture
Route::delete('/lectures/{id}', [LectureController::class, 'destroy'])->name('lectures.destroy'); // Delete a lecture


use App\Http\Controllers\YearController;

Route::get('/years', [YearController::class, 'index'])->name('years.index');
Route::post('/years', [YearController::class, 'store'])->name('years.store');
Route::delete('/years/{id}', [YearController::class, 'destroy'])->name('years.destroy');

use App\Http\Controllers\MotivationQuoteController;

Route::get('/quotes', [MotivationQuoteController::class, 'index'])->name('quotes.index');
Route::post('/quotes', [MotivationQuoteController::class, 'store'])->name('quotes.store');
Route::delete('/quotes/{id}', [MotivationQuoteController::class, 'destroy'])->name('quotes.destroy');
Route::put('/quotes/{id}', [MotivationQuoteController::class, 'update'])->name('quotes.update');

use App\Http\Controllers\StudentController;

Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
Route::post('/students', [StudentController::class, 'store'])->name('students.store');
Route::get('/students/{id}/edit', [StudentController::class, 'edit'])->name('students.edit');
Route::put('/students/{id}', [StudentController::class, 'update'])->name('students.update');
Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('students.destroy');

use App\Http\Controllers\SubjectController;

Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
Route::get('/subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');
Route::get('/subjects/{id}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
Route::put('/subjects/{id}', [SubjectController::class, 'update'])->name('subjects.update');
Route::delete('/subjects/{id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');


use App\Http\Controllers\TimetableController;

Route::get('/timetables', [TimetableController::class, 'index'])->name('timetables.index');
Route::post('/timetables/update', [TimetableController::class, 'update'])->name('timetables.update');

Route::post('/timetables/{courseId}/send-email', [TimetableController::class, 'sendEmail'])->name('timetables.sendEmail');


Route::post('/timetable/screenshot', [TimetableController::class, 'uploadScreenshot']);
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/contact', function () {
    return Inertia::render('Contact'); // Display the form
})->name('contact.form');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store'); // Handle form submission
use App\Http\Controllers\UserDashboardController;

Route::get('/user-dashboard', [UserDashboardController::class, 'index'])->name('user-dashboard');
// routes/web.php
Route::get('/user-dashboard', [UserDashboardController::class, 'index'])->name('user-dashboard');

Route::get('/get-started', function () {
    return Inertia::render('getstart');
})->name('get-started');



use App\Http\Controllers\NotificationController;

Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index')->middleware('auth');
Route::post('/notifications', [NotificationController::class, 'store'])->name('notifications.store')->middleware('auth');
Route::get('/user-notifications', [NotificationController::class, 'userIndex'])->name('user.notifications')->middleware('auth');
Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
Route::post('/notifications', [NotificationController::class, 'store'])->name('notifications.store');
Route::put('/notifications/{id}', [NotificationController::class, 'update'])->name('notifications.update'); // Update route
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy'); // Delete route
Route::get('/user-notifications', [NotificationController::class, 'userIndex'])->name('user.notifications');




Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
// Student dashboard route
// Shared dashboard route for Lecturer and Coordinator
use App\Http\Controllers\UserAddController;

Route::get('/user-add', [UserAddController::class, 'create'])->name('user.add');
Route::post('/user-add', [UserAddController::class, 'store']);

use App\Http\Controllers\UserTimetableController;

Route::middleware(['auth'])->group(function () {
    Route::get('/user-timetable', [UserTimetableController::class, 'index'])->name('user.timetable');
});
use App\Http\Controllers\QRCodeController;


Route::post('/attendance/store', [AttendanceController::class, 'store']);

use App\Http\Controllers\AttendanceController;


Route::post('/attendance/store', [AttendanceController::class, 'store'])->name('attendance.store');
Route::get('/qr/scan', function () {
    return Inertia::render('ScanQRCode');
})->name('qr.scan');

// routes/web.php

Route::get('/generate-qr-form', [QRCodeController::class, 'showForm'])->name('qr.form');
Route::post('/generate-qr-code', [QRCodeController::class, 'generate'])->name('qr.generate');
Route::post('/attendance/store', [AttendanceController::class, 'store'])->middleware('auth');


Route::get('/attendance/view', [AttendanceController::class, 'view'])->name('attendance.view');
use App\Http\Controllers\LecturerDashboardController;


Route::middleware(['auth'])->group(function () {
    Route::get('/lecturer-dashboard', [LecturerDashboardController::class, 'index'])->name('lecturer.dashboard');
});


Route::get('/lecturer-dashboard', [LecturerDashboardController::class, 'index'])->name('lecturer-dashboard');
// AuthenticatedLayout.tsx


// Lecturer Dashboard Route (Single Definition)
Route::middleware(['auth'])->group(function () {
    Route::get('/lecturer-dashboard', [LecturerDashboardController::class, 'index'])->name('lecturer.dashboard');
});

Route::get('/lecturer-dashboard', [LecturerDashboardController::class, 'index'])
    ->name('lecturer.dashboard');

    use App\Http\Controllers\UserImgController;

Route::middleware(['auth'])->group(function () {
    Route::post('/userimg/store', [UserImgController::class, 'store'])->name('userimg.store');
    Route::get('/capture-image', function () {
        return Inertia::render('CaptureImage');
    })->name('capture.image');

    Route::get('/user-images', [UserImgController::class, 'index'])->name('user-images.index'); // This should be the route for viewing images
});
Route::get('/capture-image', [UserImgController::class, 'capture'])->name('capture.image');



use App\Http\Controllers\HorizonCampusContactController;

Route::middleware(['auth'])->group(function () {
    Route::get('/contact-horizon', [HorizonCampusContactController::class, 'showContactForm'])->name('contact.horizon');
    Route::post('/contact-horizon', [HorizonCampusContactController::class, 'submitContactForm'])->name('contact.horizon.submit');
});


use App\Http\Controllers\SubjectLectureAssignmentController;

Route::middleware(['auth'])->group(function () {
    Route::get('/lecture-subject', [SubjectLectureAssignmentController::class, 'index'])->name('lecture.subject');
    Route::post('/lecture-subject', [SubjectLectureAssignmentController::class, 'store'])->name('lecture.subject.store');
});
Route::get('/lecture-subject', [SubjectLectureAssignmentController::class, 'index'])->name('lecture.subject');
Route::get('/lecture-subject', [SubjectLectureAssignmentController::class, 'index'])->name('lecture-subject.index');
Route::post('/lecture-subject', [SubjectLectureAssignmentController::class, 'store']);
Route::get('/capture-image', [UserImgController::class, 'capture']);
Route::post('/user-img', [UserImgController::class, 'store'])->name('user-img.store');
