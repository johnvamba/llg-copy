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
        Schema::create('need_has_categories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('needs_category_id')->unsigned();
            $table->morphs('model');
            $table->timestamps();

            $table->foreign('needs_category_id')->references('id')->on('needs_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('need_has_categories');
    }
}
