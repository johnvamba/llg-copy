<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeedHasCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Depreciate
        // Schema::create('need_has_categories', function (Blueprint $table) {
        //     $table->id();
        //     $table->bigInteger('need_id')->unsigned();
        //     $table->morphs('model');
        //     $table->timestamps();

        //     $table->foreign('need_id')->references('id')->on('needs');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('need_has_categories');
    }
}
