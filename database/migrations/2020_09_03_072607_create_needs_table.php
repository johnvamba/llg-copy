<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('needs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('needs_type_id')->unsigned();
            $table->bigInteger('organization_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->string('short_description')->nullable();
            $table->text('location')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->double('raised', 15, 2);
            $table->double('goal', 15, 2);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('needs_type_id')->references('id')->on('needs_types');
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
        Schema::dropIfExists('needs');
    }
}
