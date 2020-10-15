<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganizationHasCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organization_has_categories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('organization_category_id')->unsigned();
            $table->morphs('model');
            $table->timestamps();

            $table->foreign('organization_category_id')->references('id')->on('organization_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organization_has_categories');
    }
}
