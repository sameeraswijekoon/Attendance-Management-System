<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Course extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code'];
    public function timetables()
    {
        return $this->hasMany(Timetable::class);
    }
    public function userImages()
{
    return $this->hasMany(UserImg::class);
}

public function course()
{
    return $this->belongsTo(Course::class);
}
public function users()
{
    return $this->belongsToMany(User::class);
}

}

