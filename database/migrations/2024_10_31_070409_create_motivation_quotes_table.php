<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMotivationQuotesTable extends Migration
{
    public function up()
    {
        Schema::create('motivation_quotes', function (Blueprint $table) {
            $table->id();
            $table->string('author')->nullable();
            $table->text('quote');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('motivation_quotes');
    }
}
