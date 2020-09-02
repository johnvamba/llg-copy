<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppreciateStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appreciate_stories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('content_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->timestamps();

            $table->foreign('content_id')->references('id')->on('contents');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appreciate_stories');
    }
}
