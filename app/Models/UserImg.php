<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserImg extends Model
{
    use HasFactory;

    // Specify fillable fields
    protected $fillable = [
        'user_id',
        'course_id',
        'image_path',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Course model
    public function course()
    {
        return $this->belongsTo(Course::class);
    }





}
