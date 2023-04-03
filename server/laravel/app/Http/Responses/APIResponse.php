<?php

namespace App\Http\Responses;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class APIResponse
{
    const STATUS_SUCCESS = 'success';
    const STATUS_FAIL = 'fail';

    const CODE_VALIDATION_ERROR = 422;
    const CODE_SUCCESS = 200;
    const CODE_FAIL = 201;
    const CODE_BAD_REQUEST = 400;
    const CODE_UNAUTHORIZED = 401;
    const CODE_NOTFOUND = 404;
    const CODE_EXCEPTION_ERROR = 500;
    const CODE_MAINTAIN_MODE = 501;

    const MESSAGE_UNAUTHORIZED = 'Please log in again!';
    const MESSAGE_NOTFOUND = 'Not found!';
    const MESSAGE_SERVER_ERROR = 'Server Error!';
    const MESSAGE_MAINTAIN_MODE = 'System is in Maintenance Mode. Try again later!';
    const MESSAGE_BAD_REQUEST = 'Bad Request!';

    public static function parseResponse($responseStatus, $statusCode, $message, $data = null, $developerMessage = '')
    {
        if (is_array($data) && Arr::isAssoc($data)) {
            $convertedData = [];

            foreach ($data as $key => $value) {
                if ($key == 'links') {
                    continue;
                }
                if ($key == 'meta') {
                    unset($value['links']);
                    $convertedData['pagination'] = $value;
                    continue;
                }
                if ($key == 'data') {
                    $convertedData['items'] = $value;
                    continue;
                }
                $convertedData[Str::snake($key)] = $value;
            }
            $data = $convertedData;
        }

        $result = [
            'status' => $responseStatus,
            'status_code' => $statusCode,
            'message' => $message,
            'developer_message' => $developerMessage,
            'data' => $data,
        ];

        if (config('app.env') == 'production') {
            unset($result['developer_message']);
        }

        return response()->json($result, 200);
    }

    public static function success(
        $data = null,
        $message = 'OK',
        $developerMessage = ''
    )
    {
        return self::parseResponse(self::STATUS_SUCCESS, self::CODE_SUCCESS, $message, $data, $developerMessage);
    }

    public static function fail(
        $data = null,
        $message = 'Error',
        $developerMessage = ''
    )
    {
        return self::parseResponse(self::STATUS_FAIL, self::CODE_FAIL, $message, $data, $developerMessage);
    }

    public static function authenticationError(
        $data = null,
        $message = self::MESSAGE_UNAUTHORIZED,
        $developerMessage = ''
    )
    {
        return self::parseResponse(self::STATUS_FAIL, self::CODE_UNAUTHORIZED, $message, $data, $developerMessage);
    }

    public static function notFoundHttp(
        $data = null,
        $message = self::MESSAGE_NOTFOUND,
        $developerMessage = ''
    )
    {
        return  self::parseResponse(self::STATUS_FAIL,self::CODE_NOTFOUND, $message, $data, $developerMessage);
    }
    public static function notFoundData(
        $data = null,
        $message = self::MESSAGE_NOTFOUND,
        $developerMessage = ''
    )
    {
        return  self::parseResponse(self::STATUS_FAIL,self::CODE_NOTFOUND, $message, $data, $developerMessage);
    }

    public static function badRequest(
        $data = null,
        $message = self::MESSAGE_BAD_REQUEST,
        $developerMessage = ''
    )
    {
        return  self::parseResponse(self::STATUS_FAIL,self::CODE_BAD_REQUEST, $message, $data, $developerMessage);
    }

    public static function formValidationError($commonMsg, $errors, $errorFirstMsgForMobile)
    {
        $responseStatus = self::STATUS_FAIL;
        $statusCode = self::CODE_VALIDATION_ERROR;
        $result = [
            'status' => $responseStatus,
            'status_code' => $statusCode,
            'message' => $commonMsg,
            'first_message' => $errorFirstMsgForMobile ?$errorFirstMsgForMobile : "",
            'developer_message' => "",
            'data' => [
                'errors' => $errors
            ]
        ];

        return response()->json($result);
    }

    public static function response($status, $code, $message, $data = null, $developerMessage = '')
    {
        if (is_array($data) && Arr::isAssoc($data)) {
            $convertedData = [];

            foreach ($data as $key => $value) {
                $convertedData[Str::snake($key)] = $value;
            }

            $data = $convertedData;
        }

        $result = [
            'message' => $message,
            'data' => $data,
            'code' => $code
        ];

        if (config('app.env') != 'production') {
            $result['developer_message'] = $developerMessage;
        }

        return response()->json($result, $status);
    }

    public static function exceptionError($developerMessage)
    {
        $responseStatus = self::STATUS_FAIL;
        $statusCode = self::CODE_EXCEPTION_ERROR;
        $result = [
            'status' => $responseStatus,
            'status_code' => $statusCode,
            'message' => self::MESSAGE_SERVER_ERROR,
            'developer_message' =>  $developerMessage
        ];

        Log::error($developerMessage);
        return response()->json($result);
    }

    public static function maintenance()
    {
        $responseStatus = self::STATUS_FAIL;
        $statusCode = self::CODE_MAINTAIN_MODE;
        $result = [
            'status' => $responseStatus,
            'status_code' => $statusCode,
            'message' => self::MESSAGE_MAINTAIN_MODE,
        ];
        return response()->json($result);
    }

    public static function validateResponse($msg, $errors)
    {
        $result = [
            'code' => ResponseCode::VALIDATION_ERROR,
            'data' => null,
            'message' => $msg,
            'errors' => $errors
        ];

        return response()->json($result, 422);
    }


    // Unauthorized
    public static function error401($message, $data = null, $developerMessage = '')
    {
        return self::response(401, ResponseCode::ERROR, $message, $data, $developerMessage);
    }

}
