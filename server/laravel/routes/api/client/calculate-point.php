<?php

use App\Http\Controllers\API\V1\Client\CalculatePointController;
use Illuminate\Support\Facades\Route;

Route::post('calculate-point', [CalculatePointController::class, 'calculatePoint'])->name('calculate-point');
