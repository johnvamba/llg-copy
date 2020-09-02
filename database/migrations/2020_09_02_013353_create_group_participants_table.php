<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_participants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('group_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->enum('status', ['pending', 'denied', 'approved'])->default('pending');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('group_id')->references('id')->on('groups');
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
        Schema::dropIfExists('group_participants');
    }
}
