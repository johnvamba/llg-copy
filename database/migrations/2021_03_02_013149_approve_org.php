<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ApproveOrg extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->unsignedBigInteger('approved_by')->nullable(); 
            $table->unsignedBigInteger('approved_at')->nullable()->index(); //indexed para dali ma filter sa mysql
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->dropColumn([ 'approved_by', 'approved_at']);
        });
    }
}
