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
    Route::post('users/lists', 'UserController@getUsers');
    Route::resource('users', 'UserController');

    /** Goal resource module */
    Route::post('user-goal', 'GoalController@setUserGoal');
    Route::resource('goals', 'GoalController');

    /** Need resource module */
    Route::post('needs-met/nearby/{lat}/{lng}', 'NeedsController@nearby');
    Route::resource('needs', 'NeedsController');

    /** Neet Met resource module */
    Route::resource('needs-met', 'NeedsMetController');

    /** Service Offered resource module */
    Route::get('service-offer/user/request', 'ServiceOfferController@getServicesRequest');
    Route::post('service-offer/{serviceOffer}/request', 'ServiceOfferController@requestAction');
    Route::resource('service-offer', 'ServiceOfferController');

    /** Stories resource module */
    Route::get('featured/stories', 'StoryController@featuredStory');
    Route::post('stories/{story}/appreciate', 'StoryController@addAppreciate');
    Route::post('stories/{story}/comments', 'StoryController@addComment');
    Route::resource('stories', 'StoryController');

    /** Group resource module */
    Route::post('groups/{group}/participate', 'GroupController@addParticipant');
    Route::post('groups/join-request/{participantId}', 'GroupController@joinRequest');
    Route::get('groups/{group}/join-request', 'GroupController@getJoinRequest');
    Route::get('groups/messages/{group}', 'GroupController@messages');
    Route::post('groups/message/{group}', 'GroupController@addMessage');
    Route::resource('groups', 'GroupController');

    /** Orgnization resource module */
    Route::post('organization/lists', 'OrganizationController@getOrganizations');
    Route::get('organizations/{organization}/credential', 'OrganizationController@getCredential');
    Route::post('organizations/{organization}/credential', 'OrganizationController@addCredential');
    Route::resource('organizations', 'OrganizationController');

    /** Payment resource module */
    Route::post('payment/need/{need}', 'PaymentController@donateNeed');
    Route::post('payment/organization/{organization}', 'PaymentController@donateOrganization');
    Route::resource('payments', 'PaymentController');

    /** Invoice resource module */
    Route::get('invoice/donated-by-terms', 'InvoiceController@getDonatedByTerms');
    Route::get('invoice/top-donors', 'InvoiceController@getTopDonors');
    Route::resource('invoices', 'InvoiceController');

    /** Activities resource module */
    Route::post('activity/recents', 'ActivityController@recent');
    Route::resource('activities', 'ActivityController');
});