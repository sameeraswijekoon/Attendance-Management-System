<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubjectLectureAssignmentsTable extends Migration
{
    public function up()
    {
        Schema::create('subject_lecture_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('lecture_id')->constrained()->onDelete('cascade');
            $table->unique(['subject_id', 'lecture_id']); // Ensure each subject can be assigned only once
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subject_lecture_assignments');
    }
}
