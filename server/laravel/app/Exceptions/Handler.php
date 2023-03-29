<?php

namespace App\Exceptions;

use App\Http\Responses\APIResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Foundation\Http\Exceptions\MaintenanceModeException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
        });
        if (request()->is('api/*')) {
            $this->renderable(function (\Exception $e, $request) {
                return $this->handleException($request, $e);
            });
        }
    }
    public function handleException($request, \Exception $exception)
    {
        if($exception instanceof RouteNotFoundException) {
            return APIResponse::fail(null, "Route not found");
        } elseif ($exception instanceof ModelNotFoundException) {
            return APIResponse::fail(null, "Model not found");
        } elseif ($exception instanceof NotFoundHttpException) {
            return APIResponse::notFoundHttp(null, 'Api not found!');
        } elseif ($exception instanceof UnauthorizedHttpException) {
            return APIResponse::authenticationError();
        } elseif ($exception instanceof AuthenticationException) {
            return APIResponse::authenticationError(null, $exception->getMessage());
        } elseif ($exception instanceof ValidationException) {
            $firstMsgForMobile = $exception->validator->errors()->first() ?? "";
            return APIResponse::formValidationError($exception->getMessage(), $exception->errors(), $firstMsgForMobile);
        } elseif ($exception instanceof MaintenanceModeException) {
            return APIResponse::maintenance();
        } elseif($exception instanceof TokenBlacklistedException) {
            return APIResponse::authenticationError(null, $exception->getMessage());
        } elseif($exception instanceof TokenInvalidException) {
            return APIResponse::authenticationError(null, $exception->getMessage());
        } elseif($exception instanceof TokenExpiredException) {
            return APIResponse::authenticationError(null, $exception->getMessage());
        } elseif($exception instanceof JWTException) {
            return APIResponse::authenticationError(null, $exception->getMessage());
        }

        return APIResponse::exceptionError($exception->getMessage());
    }
}
