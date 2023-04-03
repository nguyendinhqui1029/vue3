<?php

namespace App\Services\Defines;
use App\Services\Interfaces\AuthServiceInterFace;
use JWTAuth, Auth, Hash, Str, Mail;


class AuthService implements AuthServiceInterFace
{
    public function login($credentials)
    {
        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return null;
        }
        return $token;
    }
}
