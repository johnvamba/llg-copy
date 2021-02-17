<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAddressField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('needs', function (Blueprint $table) {
            $table->string('address')->nullable();
        });

        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('address')->nullable();
        });

        Schema::table('service_offers', function (Blueprint $table) {
            $table->string('address')->nullable();
        });

        Schema::table('organizations', function (Blueprint $table) {
            $table->string('address')->nullable();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->string('address')->nullable();
        });

        Schema::table('campuses', function (Blueprint $table) {
            $table->string('address')->nullable();
        });
        

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('needs', 'address'))
        {
            Schema::table('needs', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }

        if (Schema::hasColumn('user_profiles', 'address'))
        {
            Schema::table('user_profiles', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }

        if (Schema::hasColumn('service_offers', 'address'))
        {
            Schema::table('service_offers', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }

        if (Schema::hasColumn('organizations', 'address'))
        {
            Schema::table('organizations', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }

        if (Schema::hasColumn('groups', 'address'))
        {
            Schema::table('groups', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }

        if (Schema::hasColumn('campuses', 'address'))
        {
            Schema::table('campuses', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }
    }
}
