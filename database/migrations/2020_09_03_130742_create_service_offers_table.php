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
            $table->morphs('model');
            $table->bigInteger('service_type_id')->unsigned();
            $table->string('name')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('short_description')->nullable();
            $table->text('location');
            $table->string('lat');
            $table->string('lng');
            $table->enum('status', ['pending', 'denied', 'approved'])->default('pending');
            $table->string('business_name');
            $table->string('business_site')->nullable();
            $table->string('business_contact');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('service_type_id')->references('id')->on('service_types');
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
