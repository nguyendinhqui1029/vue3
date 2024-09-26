<?php

namespace App\Services\Defines;
use App\Http\Responses\APIResponse;
use App\Models\User;
use App\Services\Interfaces\CalculatePointServiceInterFace;


class CalculatePointService implements CalculatePointServiceInterFace
{
    public function calculatePoint($data)
    {
        $user = User::query()->where('id',$data['user_id'])->first();
        if(!$user){
            return ['status' => false, 'msg' => "User not found"];
        }

        switch ($data['status']){
            case (1):
                $user->update(['point' => $user->point + $data['amount_coin']]);
                break;
            case (2):
                $user->update(['point' => $user->point - $data['amount_coin']]);
                break;
            default:
                break;

        }
         return ['status' => true, 'msg' => "Ok"];
    }
}
