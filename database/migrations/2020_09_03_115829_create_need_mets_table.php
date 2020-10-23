<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeedMetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('need_mets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('need_id')->unsigned();
            $table->morphs('model');
            $table->double('amount', 15, 2);
            $table->timestamps();

            $table->foreign('need_id')->references('id')->on('needs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('need_mets');
    }
}
