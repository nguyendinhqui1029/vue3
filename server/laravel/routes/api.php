<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\V1\Admin\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['as' => 'api.'], function () {
    Route::group(['prefix' => 'v1', 'as' => 'v1.'], function () {
        Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
            Route::post('login', [AuthController::class, 'login'])->name('login');
        });

        Route::group(['prefix' => 'client', 'as' => 'client.'], function () {
            include_once('api/client/auth.php');
        });
    });

    Route::group(['middleware' => ['jwt.auth','log','check_permission']], function () {

        Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {

        });
        Route::group(['prefix' => 'client', 'as' => 'client.'], function () {
            Route::group(['middleware' => ['role_client_page']], function () {
                include_once('api/client/user.php');
                include_once('api/client/calculate-point.php');
            });
        });
    });
});
