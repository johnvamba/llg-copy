<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganizationMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organization_members', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('organization_id')->unsigned();
            $table->morphs('model');
            $table->enum('status', ['pending', 'approved', 'dennied'])->default('pending');

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
        Schema::dropIfExists('organization_members');
    }
}
