<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCoordinatorIdToSubjectLectureAssignmentsTable extends Migration
{
    public function up()
    {
        Schema::table('subject_lecture_assignments', function (Blueprint $table) {
            $table->foreignId('coordinator_id')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('subject_lecture_assignments', function (Blueprint $table) {
            $table->dropForeign(['coordinator_id']);
            $table->dropColumn('coordinator_id');
        });
    }
}
