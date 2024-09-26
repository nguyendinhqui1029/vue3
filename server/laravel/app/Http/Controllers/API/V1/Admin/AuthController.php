<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Http\Responses\APIResponse;
use App\Services\Interfaces\AuthServiceInterFace;
use JWTAuth,Auth;

class AuthController extends Controller
{
    private $authService;
    public function __construct(AuthServiceInterFace $authService) {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            $token = $this->authService->login($credentials);
            if (!$token) {
                return APIResponse::fail(null, 'Invalid Credentials. Email or password is wrong');
            }
        } catch (\Exception $e) {
            return APIResponse::exceptionError($e->getMessage());
        }
        $data = [
            'token' => $token,
            'user' => new UserResource(Auth::user())
        ];
        return APIResponse::success($data);
    }

}
