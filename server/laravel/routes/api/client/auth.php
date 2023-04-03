<?php

use App\Http\Controllers\API\V1\Client\AuthController;
use App\Http\Controllers\API\V1\Client\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::get('all-user', [UserController::class, 'allUser'])->name('all-user');

//                Route::post('forgot-password', 'API\Admin\AuthController@sendMailForgotPassword')->middleware('log')->name('forgot-password');
//                Route::put('reset-password/{token}', 'API\Admin\AuthController@resetPassword')->middleware('log')->name('reset-password');
