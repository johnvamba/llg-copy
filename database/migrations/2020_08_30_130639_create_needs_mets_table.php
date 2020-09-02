<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeedsMetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('needs_mets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('content_id')->unsigned();
            $table->bigInteger('needs_met_category_id')->unsigned();
            $table->bigInteger('needs_met_type_id')->unsigned();
            $table->text('location');
            $table->string('lat');
            $table->string('lng');
            $table->double('raised', 15, 2);
            $table->double('goal', 15, 2);
            $table->timestamps();

            $table->foreign('content_id')->references('id')->on('contents');
            $table->foreign('needs_met_category_id')->references('id')->on('needs_met_categories');
            $table->foreign('needs_met_type_id')->references('id')->on('needs_met_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('needs_mets');
    }
}
