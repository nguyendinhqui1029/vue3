<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserIndexResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'user_code' => $this->user_code,
            'point' => $this->point,
            'info' => $this->info,
            'key_response' => config('cache.key_response'),
            'describe_info' => $this->describe_info,
            'address_wallets' => AddressWalletResource::collection($this->whenLoaded('addressWallet'))
        ];
    }
}
