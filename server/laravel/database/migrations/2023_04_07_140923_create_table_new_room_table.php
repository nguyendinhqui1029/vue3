<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableNewRoomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_rooms', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id_create')->nullable();
            $table->integer('user_id_join')->nullable();
            $table->integer('room_number')->nullable();
            $table->integer('bet_point')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_rooms');
    }
}
