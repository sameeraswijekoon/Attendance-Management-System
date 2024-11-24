<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendanceRecordsTable extends Migration
{
    public function up()
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Reference to the user who attended
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); // Reference to the course
            $table->foreignId('subject_id')->constrained()->onDelete('cascade'); // Reference to the subject
            $table->date('attendance_date'); // Date of attendance
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('attendance_records');
    }
}
