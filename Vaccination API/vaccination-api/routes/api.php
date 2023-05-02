<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;
use App\Http\Middleware\TokenCheck;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1/auth'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware(TokenCheck::class);
});

Route::middleware(TokenCheck::class)->prefix('v1')->group(function () {
    Route::get('/consultations', [ConsultationController::class, 'getConsultations']);
    Route::post('/consultations', [ConsultationController::class, 'requestConsultation']);
    Route::get('/spots', [SpotController::class, 'getSpotsByRegion']);
    Route::get('/spots/{spot_id}', [SpotController::class, 'getSpotBySpotId']);
    Route::post('/vaccinations', [VaccinationController::class, 'registerVaccination']);
    Route::get('/vaccinations', [VaccinationController::class, 'getAllSocietyVaccinations']);
});
