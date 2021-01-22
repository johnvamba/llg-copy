<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApprovedOffers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('service_offers', function (Blueprint $table) {
            $table->unsignedBigInteger('approved_by')->nullable()->index();
            $table->dateTime('approved_at')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('service_offers', 'approved_by'))
        {
            Schema::table('service_offers', function (Blueprint $table) {
                $table->dropIndex(['approved_by']);
                $table->dropIndex(['approved_at']);
                $table->dropColumn(['approved_by', 'approved_at']);
            });
        }
    }
}
