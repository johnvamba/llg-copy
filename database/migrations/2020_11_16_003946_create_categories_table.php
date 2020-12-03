<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable()->index(); //used to query as text but optional index
            $table->string('icon')->nullable();
            $table->boolean('status')->default(true)->index();
            $table->string('type')->default('monetary')->index(); //used to group categories. required index
            $table->unsignedBigInteger('parent_id')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('categorizes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->index();
            $table->morphs('categorize');
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories');
        });

        Schema::table('service_offers', function (Blueprint $table) {
            $table->foreign('service_type_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('categories');

        Schema::dropIfExists('categorizes');
    }
}
