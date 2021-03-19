<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StorySubmit extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->timestamp('submitted_at')->nullable()->index(); //indexed para dali ma filter sa mysql
        });
        \DB::connection()
            ->statement("UPDATE stories SET submitted_at=FROM_UNIXTIME(UNIX_TIMESTAMP(posted_at));");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropColumn(['submitted_at']);
        });
    }
}
