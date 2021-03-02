<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\UserProfile;
use App\CustomerCredential;
use App\Organization;
use App\OrganizationCredential;
use App\Device;
use Carbon\Carbon;
use DB;

use App\Http\Resources\Async\OrganizationResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('profile');

        if ($request->role) {
            $users->role($request->role);
        }
        
        $results = $users->get();

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsersStatistics(Request $request)
    {
        $date = Carbon::now();

        $users['Total Users'] = User::withTrashed()->count();
        $users['Active Users'] = User::whereHas('activities', fn($q) => $q->whereBetween('activities.updated_at', [ (clone $date)->subMonth(), $date]))->count();     
        $users['New Users'] = User::where([
                ['created_at', '>=', $date->startOfMonth()->toDateString()], 
                ['created_at', '<=', $date->endOfMonth()->toDateString()]
            ])
            ->get()
            ->count();
            
        return response()->json($users);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers(Request $request)
    {
        //
        $results['columns'] = ['id', 'name', 'email'];

        $users = User::orderBy('created_at', 'desc')
                    ->get()
                    ->chunk($request->limit);

        $results['data'] = $users;
        $results['module'] = [
                'path' => '/users',
                'singular' => 'user',
                'plural' => 'users',
                'endpoint' => 'users' 
            ];

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
            $user = User::create(
                array_merge(
                    request()->only([
                        'email'
                    ]),
                    [
                        'password' => bcrypt($request->password),
                        'name' => $request->firstName.' '.$request->lastName
                    ]
                )
            );

            $role = Role::find($request->role);
            $user->assignRole($role->name);

            $user['profile'] = UserProfile::createProfile($request, $user->id);

            if ($request->hasFile('photo')) {
                $path = Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->putFile(
                        'img', 
                        $request->file('photo')
                    );

                $url = Storage::disk(env('FILESYSTEM_DRIVER'))
                    ->url($path);

                UserProfile::uploadPhoto($url, $user->id);
            }

            return $user;
        });

        return response()->json($result, 202);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProfile(Request $request)
    {
        $user = User::with(['profile', 
                'organization'=> fn($org) => $org->select('location', 'lat', 'lng'),
                'campus'=> fn($org) => $org->select('location', 'lat', 'lng')
            ])
            ->find(auth()->user()->id);

        $user->getRoleNames();

        if($user->hasRole('organization admin')){
            $user->loc = optional($user->organization)->toArray();
        } else if ($user->hasRole('campus admin')){
            $user->loc = optional($user->campus)->toArray();
        } else {
            $user->loc = optional($user->profile)->only('location', 'lng', 'lat');
        }
        
        if($user->organization) {
            $org = (new OrganizationResource($user->organization))->resolve();
            $user->unsetRelation('organization');
            $user->organization = $org;
        }

        $user->unsetRelation('campus');

        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        $profile = UserProfile::where('user_id', $user->id)->first();
        $user['profile'] = $profile;

        return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $result = DB::transaction(function () use ($request, $user) {
            User::find($user->id)
                ->update([
                    'name' => $request->firstName.' '.$request->lastName,
                    'email' => $request->email,
                    'mobile_number' => $request->mobile_number,
                ]);

            UserProfile::where('user_id', $user->id)
                ->update(
                    array_merge(
                        request()->only(
                            'age',
                            'location',
                            'lat',
                            'lng',
                            'bio',
                        ),
                        [
                            'first_name' => $request->firstName,
                            'last_name' => $request->lastName,
                        ]
                    )
                );

                if ($request->get('photo')) {
                    $photo = $request->get('photo');
                    $name = time().'-'.Str::random(20);
                    $extension = explode('/', explode(':', substr($photo, 0, strpos($photo, ';')))[1])[1];
        
                    if (preg_match('/^data:image\/(\w+);base64,/', $photo)) {
                        $data = substr($photo, strpos($photo, ',') + 1);
                        $data = base64_decode($data);
        
                        Storage::disk(env('FILESYSTEM_DRIVER'))
                            ->put($name.'.'.$extension, $data);
        
                        Storage::disk(env('FILESYSTEM_DRIVER'))
                            ->url($data);

                        $url = Storage::url($name.'.'.$extension);

                        UserProfile::uploadPhoto($url, $user->id);
                    }
                }

                if ($request->get('coverPhoto')) {
                    $photo = $request->get('coverPhoto');
                    $name = time().'-'.Str::random(20);
                    $extension = explode('/', explode(':', substr($photo, 0, strpos($photo, ';')))[1])[1];
        
                    if (preg_match('/^data:image\/(\w+);base64,/', $photo)) {
                        $data = substr($photo, strpos($photo, ',') + 1);
                        $data = base64_decode($data);
        
                        Storage::disk(env('FILESYSTEM_DRIVER'))
                            ->put($name.'.'.$extension, $data);
        
                        Storage::disk(env('FILESYSTEM_DRIVER'))
                            ->url($data);

                        $url = Storage::url($name.'.'.$extension);

                        UserProfile::uploadCoverPhoto($url, $user->id);
                    }
                }

            return User::with('profile')->find($user->id);
        });

        return response()->json([
                'message' => 'Sucessfully updated',
                'data' => $result
            ], 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            
            return response()->json([
                    'message' => 'User successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }

    /**
     * Add user card
     *
     * @param int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCards(Request $request)
    {
        $cards = CustomerCredential::where([
                ['user_id', auth()->user()->id], 
                ['model_id', $request->organization_id], 
                ['model_type', 'App\Organization']
            ])->get(); 

        return response()->json($cards);
    }

    /**
     * Add user card
     *
     * @param int  $id
     * @return \Illuminate\Http\Response
     */
    public function addCard(Request $request, Organization $organization)
    {
        $key = OrganizationCredential::where(
                'organization_id', $organization->id
            )
            ->first();

        if (!$key) {
            return response()->json([
                'message' => "Please review your card details.",
            ], 422);
        }

        \Stripe\Stripe::setApiKey($key->secret_key);

        $credential = new CustomerCredential;
    
        if (!$credential->customer_id) {
            $createdCustomer = \Stripe\Customer::create([
                    'name' => $request->name,
                ]);

            $credential->customer_id = $createdCustomer->id;
        }

        if (!$credential->card_id) {
            $card = \Stripe\Customer::createSource(
                    $credential->customer_id,
                    ['source' => $request->token]
                );

            $credential->card_id = $card->id;
        }

        $credential->user_id = auth()->user()->id;
        $credential->name = $request->name;
        $credential->card_brand = $request->brand;
        $credential->last_four_number = $request->last4;

        $cardCredential = $organization->customerCredential()->save($credential); 

        return response()->json($cardCredential, 202);
    }
}
