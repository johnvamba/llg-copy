<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->index();
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('age');
            $table->text('location')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->text('bio')->nullable();
            $table->text('avatar')->nullable();
            $table->text('cover_photo')->nullable();
            $table->double('amount_given', 15, 2)->default(0);
            $table->timestamps();

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
        Schema::dropIfExists('user_profiles');
    }
}
