<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if 'users' table exists, create if it doesn't
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->enum('role', ['Student', 'Lecturer', 'Coordinator']);
                $table->unsignedBigInteger('badge_id')->nullable();   // Foreign key for badge
                $table->unsignedBigInteger('course_id')->nullable();  // Foreign key for course
                $table->unsignedBigInteger('faculty_id')->nullable(); // Foreign key for faculty
                $table->unsignedBigInteger('year_id')->nullable();    // Foreign key for year
                $table->timestamps(); // Only include this once for created_at and updated_at columns

                // Foreign key references
                $table->foreign('badge_id')->references('id')->on('years')->onDelete('set null');
                $table->foreign('course_id')->references('id')->on('courses')->onDelete('set null');
                $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('set null');
                $table->foreign('year_id')->references('id')->on('years')->onDelete('set null');

                $table->rememberToken();
            });
        }

        // Check if 'password_reset_tokens' table exists, create if it doesn't
        if (!Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }

        // Check if 'sessions' table exists, create if it doesn't
        if (!Schema::hasTable('sessions')) {
            Schema::create('sessions', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->foreignId('user_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->longText('payload');
                $table->integer('last_activity')->index();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
