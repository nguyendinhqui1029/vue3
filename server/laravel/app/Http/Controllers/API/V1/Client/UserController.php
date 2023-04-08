<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\AddressWallet\CreateAddressWalletRequest;
use App\Http\Requests\Client\User\DeleteAccountRequest;
use App\Http\Resources\UserIndexResource;
use App\Http\Responses\APIResponse;
use App\Http\Responses\ResponseCode;
use App\Models\AddressWallet;
use App\Models\User;
use App\Repositories\Interfaces\AddressWalletServiceInterFace;
use App\Services\Interfaces\UserServiceInterFace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    private $userService;
    private $addressWalletService;
    public function __construct(
        UserServiceInterFace $userServiceInterFace,
        AddressWalletServiceInterFace $addressWalletService
    )
    {
        $this->userService = $userServiceInterFace;
        $this->addressWalletService = $addressWalletService;
    }

    public function index(Request $request)
    {
        $user = User::query()->where('id',Auth::user()->id)->with(['addressWallet'])->first();
        return APIResponse::success(new UserIndexResource($user));
    }

    public function allUser(Request $request)
    {
        $users = User::all();
        return APIResponse::success($users);
    }

    public function deleteAddressWallet($addressWalletId)
    {
        $addressWallet =  AddressWallet::query()->where('id',$addressWalletId)->where('user_id',Auth::user()->id)->first();
        if(!$addressWallet){
            return APIResponse::fail(null, "Your wallet address is not valid");
        }

        $addressWallet->delete();
        return APIResponse::success(null,'Delete address wallet successfully');
    }

    public function addWallet(CreateAddressWalletRequest $request)
    {
        $data = $request->validated();
        $this->addressWalletService->createAddressWallet($data);

        return APIResponse::success(null, "Create address wallet successfully");
    }

    public function destroy(DeleteAccountRequest $request)
    {
        $data = $request->validated();
        $user = $this->addressWalletService->destroyAccount($data);
        if (!$user['status']) {
            return APIResponse::fail(null, $user['msg']);
        }

        return APIResponse::success(null,'Delete account successfully');
    }
}
