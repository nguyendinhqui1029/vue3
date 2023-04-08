<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable,SoftDeletes;

    const STATUS_WIN = 1;
    const STATUS_CLOSE = 2;
    const STATUS_DRAW = 3;

    const ROLE_ADMIN = 1;
    const ROLE_CLIENT = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'info', 'user_code', 'email','phone','role','info', 'name', 'point' , 'describe_info'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password' ,'deleted_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [

    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }

    public function hasPermission($actionName): bool
    {
        $permissions = config("roles.permissions")[$this->role];
        if (is_null($permissions)) {
            return true;
        }

        $permissions = array_merge(config("roles.none_authorize_actions"), $permissions);
        if (in_array($actionName, $permissions)) {
            return true;
        }

        // If action name is a.b, we should check if user has permission a.*
        $actionArray = explode('.', $actionName);
        $key = $actionArray[0];
        $actionAllItem = count($actionArray) > 1 ? $key . ".*" : null;
        return in_array($actionAllItem, $permissions);
    }

    public static function statusGame()
    {
        return [
            self::STATUS_WIN,
            self::STATUS_CLOSE,
            self::STATUS_DRAW,
        ];
    }

    public function addressWallet()
    {
        return $this->hasMany(AddressWallet::class,'user_id','id');
    }
}
