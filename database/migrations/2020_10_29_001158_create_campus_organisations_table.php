<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampusOrganisationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campus_organisations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('campus_id')->unsigned()->index();
            $table->bigInteger('organization_id')->unsigned()->index();
            $table->timestamps();

            $table->foreign('campus_id')->references('id')->on('campuses');
            $table->foreign('organization_id')->references('id')->on('organizations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campus_organisations');
    }
}
