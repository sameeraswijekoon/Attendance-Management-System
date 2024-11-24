<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Define the table name if it differs from the plural form of the model name
    protected $table = 'contacts';

    // Specify which fields are fillable for mass assignment
    protected $fillable = ['name', 'email', 'message'];
}
