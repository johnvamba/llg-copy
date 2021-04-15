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
Route::post('direct/login/{mobileNumber}', 'AuthController@directLogin');
Route::post('password/forget', 'AuthController@sendResetLinkEmail');
Route::post('password/reset', 'ResetPasswordController@reset');
Route::post('register', 'AuthController@register');
Route::post('register/info', 'AuthController@registerInfo');
Route::post('register/location', 'AuthController@registerLocation');
Route::post('register/upload-photo', 'AuthController@registerUploadPhoto');
Route::post('register/goal', 'GoalController@setUserGoal');
Route::post('auth/{user}', 'AuthController@authUser');
Route::get('need/categories/{type?}', 'NeedsCategoryController@index');
Route::get('campus', 'CampusController@index');
Route::post('register/campus/user', 'CampusController@addUser');

Route::post('org-create', 'Admin\OrganizationController@openCreate');

Route::get('checkemail', 'CheckEmail');

Route::group(['middleware' => 'wpcors', 'prefix' => 'offsite', 'namespace' => 'Admin'], function () {
    Route::get('stories', 'StoryController@onlyPublished')->name('wp.story.index');
    Route::get('stories/{story}', 'StoryController@show')->name('wp.story.show');
    Route::post('stories/{story}', 'StoryController@share')->name('wp.story.share');
});

/** OTP resource module */
Route::post('otps/sms', 'OTPController@sendOTP');
Route::post('otps/sms/verify', 'OTPController@verifyOTP');
Route::post('otps/sms/resend', 'OTPController@resendOTP');
Route::resource('otps', 'OTPController');

Route::post('account', 'Admin\CompleteAccount')->name('post.complete.account');

/** Need */
Route::get('needs/{type}/categories', 'NeedsCategoryController@index');
Route::post('needs/page/{page}', 'NeedsController@index');
Route::post('needs/organization/{organization}/page/{page}', 'NeedsController@getOrganizationNeeds');

/** Need type */
Route::resource('needs-types', 'NeedsTypeController');

/** Needs Met */
Route::get('needs-mets/group/{group}', 'NeedsMetController@getGroupNeedsMet');
Route::get('needs-mets/{need}/volunteers', 'NeedsMetController@getNeedsVolunteer');

/** Organization */
Route::get('organization/featured', 'OrganizationController@getFeaturedOrganizations');
Route::post('organizations/nearby/{lat}/{lng}', 'OrganizationController@nearby')->middleware('datafilter');
Route::get('organizations/page/{page?}', 'OrganizationController@index');

/** Story */
Route::get('featured/stories', 'StoryController@featuredStory');
Route::get('stories/recommended', 'StoryController@recommended');
Route::get('stories/page/{page?}', 'StoryController@index');
Route::get('stories/{story}/comments', 'StoryController@getComments');

/** Group */
Route::get('groups/discover/page/{page?}', 'GroupController@getDiscoverGroups');
Route::post('groups/suggested/nearby/{lat}/{lng}', 'GroupController@suggestedNearby');
Route::resource('groups', 'GroupController');

/** Invoice */
Route::post('invoice/recent/donors', 'InvoiceController@getRecentDonors');

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/payneed', 'Admin\NeedsController@showWithCred');

    Route::group(['prefix'=>'web', 'namespace'=>'Admin', 'middleware' => 'datafilter'], function() {
        Route::get('needs/types', 'NeedsController@types');

        Route::resource('needs', 'NeedsController');
        Route::get('needs/{need}/contributors', 'NeedsController@contributors');
        Route::post('needs/{need}/approve', 'NeedsController@approve');
        Route::post('needs/{need}/disapprove', 'NeedsController@disapprove');

        Route::get('organizations/async', 'OrganizationController@async');
        Route::get('organizations/{organization}/members', 'OrganizationController@members');
        Route::post('organizations/{organization}/members', 'OrganizationController@memberInvite');
        Route::post('organizations/{organization}/approve', 'OrganizationController@approve');
        Route::post('organizations/{organization}/reject', 'OrganizationController@reject');
        Route::get('organizations/{organization}/needs', 'OrganizationController@needs');
        Route::post('organizations/{organization}/access', 'OrganizationController@access');
        Route::get('organizations/credentials', 'OrganizationController@credentials');
        Route::post('organizations/credentials', 'OrganizationController@postCred');

        Route::resource('organizations', 'OrganizationController');

        Route::post('offers/{offer}/approve', 'OffersController@approve');
        Route::post('offers/{offer}/disapprove', 'OffersController@disapprove');
        Route::resource('offers', 'OffersController');

        Route::get('users/{user}/groups', 'UsersController@groups');
        Route::get('users/{user}/needs', 'UsersController@showNeedMet');

        Route::resource('users', 'UsersController');

        Route::get('campuses/async', 'CampusController@async');
        Route::get('campuses/{campus}/orgs', 'CampusController@orgs');
        Route::get('campuses/{campus}/teams', 'CampusController@teams');
        Route::resource('campuses', 'CampusController');

        Route::resource('stories', 'StoryController');
        Route::post('stories/{story}/toggle', 'StoryController@toggle');

        Route::get('groups/invite', 'GroupController@searchUserInvite');
        Route::get('groups/{group}/members', 'GroupController@members');
        Route::post('groups/invite', 'GroupController@initUserInvite');
        Route::resource('groups', 'GroupController');

        Route::post('transacts/{transact}/resend', 'TransactionController@sendInvoice');
        Route::resource('transacts', 'TransactionController');
        Route::resource('payments', 'PaymentsController');

        Route::get('receipt/template', 'ReceiptTemplateController@show');
        Route::post('receipt/template', 'ReceiptTemplateController@update');

        Route::get('search', 'GeneralSearch');

        Route::get('activities', 'Activities');
    });

    /** Role resource module */
    Route::resource('roles', 'RoleController');

    /** Device resource module */
    Route::resource('devices', 'DeviceController');

    /** User resource module */
    Route::get('user/me', 'UserController@getProfile');
    Route::get('user/me/update-profile', 'UserController@updateProfile');
    Route::get('user/stats', 'UserController@getUsersStatistics')->middleware('datafilter');
    Route::get('user/{user}/campus', 'UserController@getCampus');
    Route::post('users/lists', 'UserController@getUsers');
    Route::post('user/add-card/{organization}', 'UserController@addCard');
    Route::post('user/cards', 'UserController@getCards');
    Route::resource('users', 'UserController');
    
    /** Goal resource module */
    Route::get('goal/me', 'GoalController@getUserGoal');
    Route::get('goal/group/{groupId}', 'GoalController@getGroupGoal');
    Route::resource('goals', 'GoalController');

    /** Campus resource module */
    Route::resource('campuses', 'CampusController');

    /** Need resource module */
    Route::post('need/lists', 'NeedsController@getNeeds');
    Route::get('need/recent-added', 'NeedsController@getRecentAdded')->middleware('datafilter');
    Route::post('needs-met/nearby/{lat}/{lng}', 'NeedsController@nearby');
    Route::get('needs/open/total', 'NeedsController@getTotalNeedsOpen')->middleware('datafilter');
    Route::post('need/{need}/volunteer', 'NeedsController@addVolunteer');
    Route::resource('needs', 'NeedsController');

    /** Needs Categories resource module */
    Route::post('needs-category/lists', 'NeedsCategoryController@getCategories');
    Route::resource('needs-categories', 'NeedsCategoryController');

    /** Needs Met resource module */
    Route::get('needs-mets/user/{user}', 'NeedsMetController@getUserNeedsMet');
    Route::get('needs-mets/total', 'NeedsMetController@getTotalNeedsMet')->middleware('datafilter');
    Route::resource('needs-met', 'NeedsMetController');

    /** Service Offered resource module */
    Route::post('offer/lists', 'ServiceOfferController@getOffers');
    Route::get('service-offer/user', 'ServiceOfferController@getServiceOffered');
    Route::get('service-offer/help/total', 'ServiceOfferController@getTotalOffers')->middleware('datafilter');
    Route::get('service-offer/user/request', 'ServiceOfferController@getServicesRequest');
    Route::post('service-offer/{serviceOffer}/request', 'ServiceOfferController@requestAction');
    Route::resource('service-offer', 'ServiceOfferController');

    /** Offers Types resource module */
    Route::resource('offers-types', 'OffersTypeController');

    /** Stories resource module */
    Route::post('story/lists', 'StoryController@getStories');
    Route::post('stories/{story}/appreciate', 'StoryController@Appreciate');
    Route::get('stories/search/{keyword}/page/{page?}', 'StoryController@searchStory');
    Route::post('stories/{story}/comments', 'StoryController@addComment');
    Route::resource('stories', 'StoryController');

    /** Group invite resource module */
    Route::get('users-not-in-group/{group}', 'GroupInviteController@getUsersNotInGroup');
    Route::resource('group-invites', 'GroupInviteController');
    
    /** Group Participants resource module */
    Route::get('group/{group}/participants/page/{page?}', 'GroupParticipantController@index');
    Route::post('group-participants/{groupId}/cancel-request', 'GroupParticipantController@cancelRequest');
    Route::resource('group-participants', 'GroupParticipantController');

    /** Group resource module */
    Route::get('group/me', 'GroupController@getMyGroup');
    Route::post('group/lists', 'GroupController@getGroups');
    Route::post('group/search/people', 'GroupController@searchPeople');
    Route::post('group/{group}/update-goal', 'GoalController@updateGroupGoal');
    Route::post('group/{group}/add-photo', 'GroupController@addPhoto');
    Route::post('groups/join-request/{participantId}', 'GroupController@joinRequest');
    Route::post('groups/{group}/participate', 'GroupController@addParticipant');
    Route::get('groups/{group}/join-request', 'GroupController@getJoinRequest');
    Route::get('groups/messages/{group}', 'GroupController@messages');
    Route::post('groups/message/{group}', 'GroupController@addMessage');

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
    Route::resource('organizations', 'OrganizationController');

    /** Payment resource module */
    Route::post('payment/need/{need}', 'PaymentController@donateNeed');
    Route::post('payment/organization/{organization}', 'PaymentController@donateOrganization');
    Route::resource('payments', 'PaymentController');

    /** Invoice resource module */
    Route::get('invoice/donations', 'InvoiceController@getDonations')->middleware('datafilter');
    Route::get('invoice/needs/donations', 'InvoiceController@getNeedsDonations')->middleware('datafilter');
    Route::get('invoice/top-donors', 'InvoiceController@getTopDonors')->middleware('datafilter');
    Route::resource('invoices', 'InvoiceController');

    /** Activities resource module */
    Route::post('activity/recents', 'ActivityController@recent');
    Route::resource('activities', 'ActivityController');

    /** Notification resource module */
    Route::resource('notifications', 'NotificationController');

    Route::post('logout', 'AuthController@logout');
});