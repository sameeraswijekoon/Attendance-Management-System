<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('student_id')->unique();

            // Foreign key fields
            $table->unsignedBigInteger('course_id'); // Reference to courses table
            $table->unsignedBigInteger('faculty_id'); // Reference to faculties table
            $table->unsignedBigInteger('year_id');    // Reference to years table
            $table->unsignedBigInteger('badge_id');   // Reference to years table (badge_number)

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('cascade');
            $table->foreign('year_id')->references('id')->on('years')->onDelete('cascade');
            $table->foreign('badge_id')->references('id')->on('years')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}
