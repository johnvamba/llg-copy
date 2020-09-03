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

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');

Route::group(['middleware' => ['auth:api']], function () {
    /** User resource module */
    Route::resource('users', 'UserController');

    /** Goal resource module */
    Route::post('user-goal', 'GoalController@setUserGoal');
    Route::resource('goals', 'GoalController');

    /** Needs Met resource module */
    Route::post('needs-met/nearby/{lat}/{lng}', 'NeedsMetController@nearby');
    Route::resource('needs-met', 'NeedsMetController');

    /** Service Offered resource module */
    Route::resource('service-offer', 'ServiceOfferController');

    /** Stories resource module */
    Route::post('stories/appreciate/{content}', 'StoryController@appreciate');
    Route::post('stories/comment/{content}', 'StoryController@comment');
    Route::post('stories/featured/{content}', 'StoryController@addFeaturedStory');
    Route::get('stories/featured', 'StoryController@featuredStory');
    Route::resource('stories', 'StoryController');

    /** Group resource module */
    Route::post('groups/participant/{group}', 'GroupController@addParticipant');
    Route::post('groups/join-request/{group}', 'GroupController@joinRequest');
    Route::get('groups/join-request/{group}', 'GroupController@getJoinRequest');
    Route::get('groups/messages/{group}', 'GroupController@message');
    Route::post('groups/message/send', 'GroupController@addMessage');
    Route::resource('groups', 'GroupController');

    /** Orgnization resource module */
    Route::post('organizations/{organization}/needs-met', 'OrganizationController@createNeedsMet');
    Route::post('organizations/{organization}/contents', 'OrganizationController@contents');
    Route::resource('organizations', 'OrganizationController');

    /** Community resource module */
    Route::resource('communities', 'CommunityController');
});