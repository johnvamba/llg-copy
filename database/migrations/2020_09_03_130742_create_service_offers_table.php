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
            $table->bigInteger('service_type_id')->unsigned()->index();
            $table->string('name')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('short_description')->nullable();
            $table->text('location');
            $table->string('lat');
            $table->string('lng');
            $table->enum('status', ['pending', 'denied', 'approved'])->default('pending')->index();
            $table->string('business_name');
            $table->string('business_site')->nullable();
            $table->string('business_contact');
            $table->date('end_date');
            // $table->unsignedBigInteger('approved_by')->nullable()->index();
            // $table->dateTime('approved_at')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
            //Transfer to categories table
            // $table->foreign('service_type_id')->references('id')->on('categories');
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
