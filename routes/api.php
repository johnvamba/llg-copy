<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('register', 'AuthController@register');

Route::group(['middleware' => ['auth:api']], function () {
    /** User resource module */
    Route::resource('users', 'UserController');

    /** Goal resource module */
    Route::post('user-goal', 'GoalController@setUserGoal');
    Route::resource('goals', 'GoalController');

    /** Needs Met resource module */
    Route::resource('needs-met', 'NeedsMetController');

    /** Service Offered resource module */
    Route::resource('service-offer', 'ServiceOfferController');

    /** Stories resource module */
    Route::resource('stories', 'StoryController');
});