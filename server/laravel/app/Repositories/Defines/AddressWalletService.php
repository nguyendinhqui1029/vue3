<?php

namespace App\Repositories\Defines;
use App\Models\AddressWallet;
use App\Models\User;
use App\Repositories\Interfaces\AddressWalletServiceInterFace;
use JWTAuth, Auth, Hash, Str, Mail;


class AddressWalletService implements AddressWalletServiceInterFace
{
    public function createAddressWallet($data)
    {
        $addressWallet = new AddressWallet();
        $data['user_id'] = Auth::user()->id;
        $addressWallet->fill($data)->save();
        return $addressWallet;
    }

    public function destroyAccount($data)
    {
        $user = User::query()->where('id',3)->where('user_code',$data['user_code'])->first();
        if(!$user){
            return ['status' => false, 'msg' => "Account does not exist"];
        }
        $user->delete();
        return ['status' => true, 'msg' => "Ok"];
    }
}
