<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'badge_id',
        'course_id',
        'faculty_id',
        'year_id',
    ];

    protected $hidden = ['password'];

    public function badge()
    {
        return $this->belongsTo(Year::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function year()
    {
        return $this->belongsTo(Year::class);
    }
    public function userImages()
{
    return $this->hasMany(UserImg::class);
}



    // Relationship with Courses (Many-to-Many)
    public function courses()
    {
        return $this->belongsToMany(Course::class);  // For many-to-many relationship between User and Course
    }
}
