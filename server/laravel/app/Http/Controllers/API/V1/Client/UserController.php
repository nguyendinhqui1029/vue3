<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Responses\APIResponse;
use App\Http\Responses\ResponseCode;
use App\Models\User;
use App\Services\Interfaces\UserServiceInterFace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    private $userService;
    public function __construct(UserServiceInterFace $userServiceInterFace)
    {
        $this->userService = $userServiceInterFace;
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        return APIResponse::success(new UserResource($user));
    }
}
