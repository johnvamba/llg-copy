<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('organization_id')->unsigned()->index();
            $table->bigInteger('user_id')->unsigned()->index();
            $table->string('title');
            $table->text('description'); //now as simple text
            $table->text('raw_draft_json')->nullable();
            $table->string('short_description')->nullable();
            $table->date('featured_start_date')->nullable();
            $table->date('featured_end_date')->nullable();
            $table->datetime('posted_at')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('organization_id')->references('id')->on('organizations');
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
        Schema::dropIfExists('stories');
    }
}
