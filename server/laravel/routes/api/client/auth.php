<?php

use App\Http\Controllers\API\V1\Client\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('login', [AuthController::class, 'login'])->name('login');
//                Route::post('forgot-password', 'API\Admin\AuthController@sendMailForgotPassword')->middleware('log')->name('forgot-password');
//                Route::put('reset-password/{token}', 'API\Admin\AuthController@resetPassword')->middleware('log')->name('reset-password');
