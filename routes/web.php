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
Route::get('/password/reset', fn() => view('app'))->name('password.reset');
Route::get('/account', fn() => view('app'))->middleware('signed')->name('complete.account');
Route::get('/expired', fn() => view('app'))->name('web.expired');

Route::group([
	'prefix' => 'test'
], function() {
	Route::get('receipt', 'TestControl@receiptEmail');
	Route::get('org', 'TestControl@orgEmail');
	Route::get('group', 'TestControl@groupEmail');
	Route::get('initreceipt', 'TestControl@sendEmail');
	Route::get('password', 'TestControl@password');
	Route::get('story', 'TestControl@story');
});

Route::get('/admin/invite', function () {
    return view('email.org_invite');
});

Route::get('/needs/print', 'Admin\Dashboard');

Route::view('/{path1?}/{path2?}/{path3?}/{path4?}/{path5?}', 'app');

Route::any('*', function(){
	return view('app');
});
