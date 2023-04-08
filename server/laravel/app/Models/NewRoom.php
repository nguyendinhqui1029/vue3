<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewRoom extends Model
{

    protected $table = 'new_rooms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id_create', 'user_id_join', 'room_number' , 'bet_point'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [

    ];
}
