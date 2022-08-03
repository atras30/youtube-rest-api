<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

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

Route::get("/students", [StudentController::class, "index"]);
Route::post("/students", [StudentController::class ,"store"]);
Route::put("/students/{id}", [StudentController::class ,"update"]);
Route::get("/students/{id}", [StudentController::class ,"show"]);
Route::delete("/students/{id}", [StudentController::class ,"destroy"]);

Route::post("/auth/login", [AuthenticationController::class, "login"]);

Route::middleware("auth:sanctum")->post("/auth/logout", [AuthenticationController::class, "logout"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
