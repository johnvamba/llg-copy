<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunityContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('community_contents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('community_id')->unsigned();
            $table->bigInteger('content_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('community_id')->references('id')->on('communities');
            $table->foreign('content_id')->references('id')->on('contents');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('community_contents');
    }
}
