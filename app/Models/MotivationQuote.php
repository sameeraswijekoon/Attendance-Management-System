<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotivationQuote extends Model
{
    use HasFactory;

    protected $fillable = ['author', 'quote'];
}
