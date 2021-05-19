<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateGoalColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::statement("ALTER TABLE goals CHANGE COLUMN status status ENUM('in progress', 'done', 'achieved') NOT NULL DEFAULT 'in progress'");
        
        Schema::table('goals', function (Blueprint $table) {
            $table->boolean('reset')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
