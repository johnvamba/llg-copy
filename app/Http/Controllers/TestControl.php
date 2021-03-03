<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionReceipt;
use App\Mail\GroupInvitation;
use App\Mail\OrgInvitation;
use App\Mail\PasswordReset;
use App\Mail\StoryPublished;

use App\ReceiptTemplate;
use App\Organization;
use App\OrgInvites;
use App\Story;

use App\User;
use App\Group;

class TestControl extends Controller
{
    public function receiptEmail(){
    	$organization = Organization::has('template')->with('template')->first();

        if(!$organization->template){
            $organization->setRelation('template', new ReceiptTemplate);
        }

    	return new TransactionReceipt($organization, 
    		[ 'Sample Transaction' => 200 ]
    	);
    }

    public function orgEmail(){
        $organization = Organization::has('template')->with('template')->first();

        $user = User::where('email', 'admin@gmail.com')->first();

        return (new OrgInvitation($organization, new OrgInvites))->to('logicbase.amba@gmail.com');
    }

    public function story(){
        $story = Story::first();

        return (new StoryPublished($story))->to('logicbase.amba@gmail.com');
    }

    public function groupEmail(){
        $group = Group::first();

        $user = User::where('email', 'admin@gmail.com')->first();

        return (new GroupInvitation($group))->to('logicbase.amba@gmail.com');
    }

    public function password() {
        $user = User::where('email', 'admin@gmail.com')->first();

        return (new PasswordReset('sample_token'))->toMail($user);
    }

    public function sendEmail() {
        //tested and works for receipt email. //requires lower version of css for email setup
    	$organization = Organization::has('template')->with('template')->first();
    	dispatch(fn() =>  Mail::to('logicbase.amba@gmail.com')->send(new TransactionReceipt($organization, [  'Sample Transaction' => 200 ])) );

    	return 'Email Sent!';
    }
}
