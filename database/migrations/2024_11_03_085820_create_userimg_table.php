<?php

// database/migrations/xxxx_xx_xx_create_user_imgs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_imgs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->string('day'); // New column for the day
            $table->string('time'); // New column for the time
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_imgs');
    }
};
