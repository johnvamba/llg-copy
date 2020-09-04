<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_offers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('organization_id')->nullable()->unsigned();
            $table->bigInteger('service_type_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name')->nullable();
            $table->string('title');
            $table->text('description');
            $table->text('location');
            $table->string('lat');
            $table->string('lng');
            $table->enum('status', ['pending', 'denied', 'approved'])->default('pending');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->foreign('service_type_id')->references('id')->on('service_types');
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
        Schema::dropIfExists('service_offers');
    }
}
