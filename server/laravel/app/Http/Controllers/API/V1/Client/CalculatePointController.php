<?php

namespace App\Http\Controllers\API\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\CalculatePoint\CalculatePointRequest;
use App\Http\Responses\APIResponse;
use App\Http\Responses\ResponseCode;
use App\Services\Interfaces\CalculatePointServiceInterFace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalculatePointController extends Controller
{

    private $calculatePointServiceInterFace;
    public function __construct(CalculatePointServiceInterFace $calculatePointServiceInterFace)
    {
        $this->calculatePointServiceInterFace = $calculatePointServiceInterFace;
    }

    public function calculatePoint(CalculatePointRequest $request)
    {
        $data = $request->validated();
        $calculatePoint =$this->calculatePointServiceInterFace->calculatePoint($data);
        if (!$calculatePoint['status']) {
            return APIResponse::fail(null, $calculatePoint['msg']);
        }
        return APIResponse::success(null, 'Change point successfully');
    }
}
