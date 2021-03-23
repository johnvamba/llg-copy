<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApplePayCardToCustomerCredentials extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customer_credentials', function (Blueprint $table) {
            //
            $table->integer('expiry_month')->nullable();
            $table->integer('expiry_year')->nullable();
            $table->boolean('is_apple_pay_card')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customer_credentials', function (Blueprint $table) {
            //
        });
    }
}
