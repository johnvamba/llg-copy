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
Route::post('register/info', 'AuthController@registerInfo');
Route::post('register/location', 'AuthController@registerLocation');
Route::post('register/upload-photo', 'AuthController@registerUploadPhoto');
Route::post('register/goal', 'GoalController@setUserGoal');
Route::post('auth/{user}', 'AuthController@authUser');
Route::get('need/categories', 'NeedsCategoryController@index');

Route::group(['middleware' => ['auth:api']], function () {

    Route::group(['prefix'=>'web', 'namespace'=>'Admin'], function() {
        Route::get('needs/types', 'NeedsController@types');

        Route::resource('needs', 'NeedsController');
        Route::post('needs/{need}/approve', 'NeedsController@approve');
        Route::post('needs/{need}/disapprove', 'NeedsController@disapprove');

        Route::get('organizations/async', 'OrganizationController@async');
        Route::resource('organizations', 'OrganizationController');

        Route::resource('offers', 'OffersController');
    });

    /** Role resource module */
    Route::resource('roles', 'RoleController');

    /** User resource module */
    Route::get('user/me', 'UserController@getProfile');
    Route::get('user/me/update-profile', 'UserController@updateProfile');
    Route::get('user/stats', 'UserController@getUsersStatistics');
    Route::post('users/lists', 'UserController@getUsers');
    Route::post('user/add-card/{organization}', 'UserController@addCard');
    Route::post('user/cards', 'UserController@getCards');
    Route::resource('users', 'UserController');
    
    /** Goal resource module */
    Route::get('goal/user', 'GoalController@getUserGoal');
    Route::get('goal/group/{groupId}', 'GoalController@getGroupGoal');
    Route::resource('goals', 'GoalController');

    /** Need resource module */
    Route::post('need/lists', 'NeedsController@getNeeds');
    Route::get('need/recent-added', 'NeedsController@getRecentAdded');
    Route::post('needs-met/nearby/{lat}/{lng}', 'NeedsController@nearby');
    Route::get('needs/open/total', 'NeedsController@getTotalNeedsOpen');
    Route::post('needs/organization/{organization}', 'NeedsController@getOrganizationNeeds');
    Route::post('needs/page/{page}', 'NeedsController@index');
    Route::resource('needs', 'NeedsController');

    /** Needs Categories resource module */
    Route::post('needs-category/lists', 'NeedsCategoryController@getCategories');
    Route::resource('needs-categories', 'NeedsCategoryController');

    /** Needs Types resource module */
    Route::resource('needs-types', 'NeedsTypeController');
    
    /** Needs Met resource module */
    Route::get('needs-mets/user', 'NeedsMetController@getUserNeedsMet');
    Route::get('needs-mets/total', 'NeedsMetController@getTotalNeedsMet');
    Route::resource('needs-met', 'NeedsMetController');

    /** Service Offered resource module */
    Route::post('offer/lists', 'ServiceOfferController@getOffers');
    Route::get('service-offer/user', 'ServiceOfferController@getServiceOffered');
    Route::get('service-offer/help/total', 'ServiceOfferController@getTotalOffers');
    Route::get('service-offer/user/request', 'ServiceOfferController@getServicesRequest');
    Route::post('service-offer/{serviceOffer}/request', 'ServiceOfferController@requestAction');
    Route::resource('service-offer', 'ServiceOfferController');

    /** Offers Types resource module */
    Route::resource('offers-types', 'OffersTypeController');

    /** Stories resource module */
    Route::post('story/lists', 'StoryController@getStories');
    Route::get('featured/stories', 'StoryController@featuredStory');
    Route::post('stories/{story}/appreciate', 'StoryController@addAppreciate');
    Route::post('stories/{story}/comments', 'StoryController@addComment');
    Route::resource('stories', 'StoryController');

    /** Group resource module */
    Route::post('group/lists', 'GroupController@getGroups');
    Route::post('group/search/people', 'GroupController@searchPeople');
    Route::post('group/{group}/update-goal', 'GoalController@updateGroupGoal');
    Route::post('group/{group}/add-photo', 'GroupController@addPhoto');
    Route::post('groups/join-request/{participantId}', 'GroupController@joinRequest');
    Route::post('groups/{group}/participate', 'GroupController@addParticipant');
    Route::get('groups/{group}/join-request', 'GroupController@getJoinRequest');
    Route::get('groups/messages/{group}', 'GroupController@messages');
    Route::post('groups/message/{group}', 'GroupController@addMessage');
    Route::post('groups/discover', 'GroupController@getDiscoverGroups');
    Route::resource('groups', 'GroupController');

    /** Orgnization Categories resource module */
    Route::resource('organizations-categories', 'OrganizationCategoryController');
    
    /** Orgnization Members resource module */
    Route::post('organization/{organization}/members', 'OrganizationMemberController@index');
    Route::post('organization-members/uninvited', 'OrganizationMemberController@getUninvitedUsers');
    Route::resource('organization-members', 'OrganizationMemberController');

    /** Orgnization resource module */
    Route::post('organization/lists', 'OrganizationController@getOrganizations');
    Route::get('organizations/{organization}/credential', 'OrganizationController@getCredential');
    Route::post('organizations/{organization}/credential', 'OrganizationController@addCredential');
    Route::post('organizations/nearby/{lat}/{lng}', 'OrganizationController@nearby');
    Route::resource('organizations', 'OrganizationController');

    /** Payment resource module */
    Route::post('payment/need/{need}', 'PaymentController@donateNeed');
    Route::post('payment/organization/{organization}', 'PaymentController@donateOrganization');
    Route::resource('payments', 'PaymentController');

    /** Invoice resource module */
    Route::post('invoice/recent/donors', 'InvoiceController@getRecentDonors');
    Route::get('invoice/donations', 'InvoiceController@getDonations');
    Route::get('invoice/needs/donations', 'InvoiceController@getNeedsDonations');
    Route::get('invoice/top-donors', 'InvoiceController@getTopDonors');
    Route::resource('invoices', 'InvoiceController');

    /** Activities resource module */
    Route::post('activity/recents', 'ActivityController@recent');
    Route::resource('activities', 'ActivityController');
});