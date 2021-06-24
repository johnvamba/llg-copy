<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TransactionReceipt;
use App\Mail\GroupInvitation;
use App\Mail\OrgInvitation;
use App\Mail\NewOrgEmail;

use App\Mail\NeedApproved;
use App\Mail\NeedRejected;
use App\Mail\OrgAccepted;
use App\Mail\OrgRejected;

use App\Mail\OrgReportMail;

use App\Mail\PasswordReset;
use App\Mail\StoryPublished;

use App\ReceiptTemplate;
use App\Organization;
use App\OrgInvites;
use App\Story;
use App\Need;


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

    public function needApprove(){
        $need = Need::first();
        return new NeedApproved($need);
    }

    public function needReject(){
        $need = Need::first();
        return new NeedRejected($need);
    }

    public function orgApprove(){
        $need = Organization::find(29);
        return new OrgAccepted($need);
    }

    public function orgReject(){
        $need = Organization::first();
        return new OrgRejected($need);
    }

    public function orgEmail(){
        $organization = Organization::has('template')->with('template')->first();

        $user = User::where('email', 'admin@gmail.com')->first();

        return (new OrgInvitation($organization, new OrgInvites))->to('logicbase.amba@gmail.com');
    }

    public function orgNew(){
        $organization = Organization::has('template')->with('template')->first();

        return (new NewOrgEmail($organization))->to('logicbase.amba@gmail.com');
    }

    public function story(){
        $story = Story::first();

        return (new StoryPublished($story))->to('logicbase.amba@gmail.com');
    }

    public function reports(){
        $report = Organization::has('needs.mets')->first();

        return new OrgReportMail($report, now()->subWeek(), now());//->to('logicbase.amba@gmail.com');
        // Mail::to('logicbase.amba@gmail.com')->send(new OrgReportMail($report, now()->subWeek(), now()));
        // dd('sent');
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

    public function tester() {
        // $organization = Organization::find(3);
        $mobileNumber = '00123322312';
        $skipping = false;

        $user = User::with('profile')
            ->where('mobile_number', $mobileNumber)
            ->first();



        /*$orgs = Organization::whereHas('needs', function($needs) {
            $needs->whereHas('mets', function($mets) {
                $mets->whereBetween('need_mets.created_at', [now()->subWeek(), now()]);
            });
        })->whereHas('members')
        ->with(['members', 'needs.mets'])
        ->get();*/

        dd($user, $skipping, preg_replace('/\D/i', '', $mobileNumber));

        // $users = User::unfilter()
        //     ->role('admin')
        //     ->orWhereHas('campus', function($camp) use ($organization){
        //         $camp->whereHas('organizations', fn($org) => $org->where('organizations.id', $organization->id));
        //     })->get();
        // optional($need)->loadMissing(['organization'=>function($org){
        //     $org->withoutGlobalScopes()->with(['members' => fn($m) => $m->unfilter()]);
        // }]);
        // $users = User::unfilter()->role('admin')->get();

        dd($users);
    }
}
