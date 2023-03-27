<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserPreferencesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SourceController;

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

Route::middleware('auth:api')->group(function () {
    Route::post('/user/preferences', [UserPreferencesController::class, 'save']);
    Route::get('/user/preferences', [UserPreferencesController::class, 'get']);

    Route::get('/user/articles', [NewsController::class, 'getArticles']);
    Route::post('/user/articles/search', [NewsController::class, 'search']);
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/articles', [NewsController::class, 'getArticles']);
Route::post('/articles/search', [NewsController::class, 'search']);

Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::get('/sources', [SourceController::class, 'getAllSources']);