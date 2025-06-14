<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_stories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('story_id')->unsigned()->index();
            $table->bigInteger('user_id')->unsigned()->index();
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->foreign('story_id')->references('id')->on('stories');
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
        Schema::dropIfExists('comment_stories');
    }
}
