<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/password/reset', 'Admin\AppFile')->name('password.reset');
Route::get('/admin/organizations/requests/{organization}', 'Admin\AppFile')->name('complete.organisation');

Route::get('/account', 'Admin\AppFile')->middleware('signed')->name('complete.account');
Route::get('/expired', 'Admin\AppFile')->name('web.expired');

Route::group([
	'prefix' => 'test'
], function() {
	Route::get('/', 'TestControl@tester');
	Route::get('receipt', 'TestControl@receiptEmail');
	Route::get('org', 'TestControl@orgEmail');
	Route::get('neworg', 'TestControl@orgNew');
	Route::get('group', 'TestControl@groupEmail');
	Route::get('initreceipt', 'TestControl@sendEmail');
	Route::get('password', 'TestControl@password');
	Route::get('story', 'TestControl@story');
	Route::get('needapprove', 'TestControl@needApprove');
	Route::get('needreject', 'TestControl@needReject');
	Route::get('orgapprove', 'TestControl@orgApprove');
	Route::get('orgreject', 'TestControl@orgReject');
});

Route::get('/admin/invite', 'Admin\EmailController@orgInvite');

Route::get('/needs/print', 'Admin\Dashboard');

Route::view('/{path1?}/{path2?}/{path3?}/{path4?}/{path5?}', 'app');

Route::any('*', 'Admin\AppFile');
