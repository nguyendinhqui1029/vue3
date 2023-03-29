<?php
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\V1\Client\UserController;

Route::resource('users', UserController::class)->except(['create','edit','update','store','destroy','show']);
