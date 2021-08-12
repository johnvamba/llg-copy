<?php

namespace App\Http\Controllers;

use App\Events\GroupMessageEvent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use App\Http\Requests\GroupUpdateRequest;
use App\Http\Requests\GroupStoreRequest;
use Illuminate\Http\Request;
use App\User;
use App\GroupParticipant;
use App\GroupInvite;
use App\Group;
use App\Goal;
use App\Tag;
use App\GroupChat;
use App\Need;
use App\NeedMet;
use DB;
use Carbon\Carbon;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use FCM;

class GroupController extends Controller
{
    public function testNotification()
    {
        $notification = [
            "tokens" => ['fGfuYrdGbU8MqxkhmAWUG4:APA91bGaCMya52kMJda6duf9zk94tc9GMCQ5RHYg1jsj9zAzSR-FYpUEFmXK3PtJsXh_tRDokIujzDCPCa1MTgY7LOeKSYULZH0lFoP2T9hCwKGLNiLpEKhfjiZ2Cqa_XsjMPJoWqdq3'],
            "data" => [
                'message' => "demo",
                'type' => 'group_message'
            ]
        ];

        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder('Group Invitation');
        $notificationBuilder->setBody($notification['data']['message'])
                            ->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData(['data' => json_encode($notification['data'], true)]);

        $option = $optionBuilder->build();
        $notificationBuild = $notificationBuilder->build();
        $data = $dataBuilder->build();

        $downstreamResponse = FCM::sendTo($notification['tokens'], $option, $notificationBuild, $data);
        dd($downstreamResponse);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::with('user')
            ->where('privacy', 'public')
            ->orderBy('created_at', 'desc')
            ->paginate();

        foreach ($groups as $group) {
            $group->getMedia();
            $group['photo'] = $group->getFirstMediaUrl('photo');
        }

        return response()->json($groups);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function Currents(Request $request)
    {
        $results['columns'] = [
            'id',
            'name',
            'description',
            'privacy',
            'location'
        ];

        $groups = Group::where('status', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map->only(
                'id',
                'name',
                'description',
                'privacy',
                'location'
            )
            ->chunk($request->limit);

        $results['data'] = $groups;
        $results['module'] = [
                'path' => '/groups',
                'endpoint' => 'groups',
                'singular' => 'group',
                'plural' => 'groups',
            ];

        return response()->json($results);
    }

    /**
     * Display discover groups
     *
     * @return \Illuminate\Http\Response
     */
    public function getDiscoverGroups(Request $request, $page = 1)
    {
        $groupParticipated = [];
        $groups = [];

        if (auth()->check()) {
            $groupParticipated = GroupParticipant::where(function($query) {
                    $query->where('user_id', auth()->user()->id)
                        ->where('status', 'approved');
                })->pluck('group_id');
        }

        $groups = Group::where('privacy', 'public');
        
        if (auth()->check()) {
            $groups = $groups->where('user_id', '!=', auth()->user()->id);
        }

        $groups = $groups->whereNotIn('id', $groupParticipated)
            ->paginate(10, ['*'], 'stories', $page);

        foreach ($groups as $group) {
            $group['photo'] = $group->getFirstMediaUrl('photo');
            
            $group['goal'] = Goal::whereHasMorph(
                    'model',
                    ['App\Group'],
                    function(Builder $query) use ($group) {
                        $query->where('model_id', $group->id);
                    }
                )
                ->where('status', 'in progress')
                ->latest()
                ->first();
            
            if (!$group['goal']) {
                break;
            }

            $date = Carbon::parse($group['goal']->created_at);

            $participants = GroupParticipant::where([
                    ['group_id', $group->id],
                    ['status', 'approved'],
                ])
                ->pluck('user_id');

            $participants->push($group->user_id);

            $group['need_mets_count'] = NeedMet::whereHasMorph(
                    'model',
                    ['App\User'],
                    function ($query) use ($participants) {
                        $query->whereIn('model_id', $participants);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString()
                ])
                ->count();

            $group['members_count'] = GroupParticipant::where([
                    ['group_id', $group->id],
                    ['status', 'approved']
                ])->count();
        }

        return response()->json($groups, 200);
    }
    
    /**
     * Display search discover groups
     *
     * @return \Illuminate\Http\Response
     */
    public function getSearchGroup(Request $request)
    {
        $page = $request->page ?: 1;

        $groups = Group::where('privacy', 'public');

        if ($request->keyword != '') {
            $groups = $groups->where('name', 'like', '%'.$request->keyword.'%');
        }

        $groups = $groups->paginate(10, ['*'], 'search_group', $page);

        foreach ($groups as $group) {
            $group['goal'] = Goal::whereHasMorph(
                    'model',
                    ['App\Group'],
                    function(Builder $query) use ($group) {
                        $query->where('model_id', $group->id);
                    }
                )
                ->where('status', 'in progress')
                ->latest()
                ->first();
            
            if ($group['goal']) {
                $date = Carbon::parse($group['goal']->created_at);

                $participants = GroupParticipant::where([
                        ['group_id', $group->id],
                        ['status', 'approved'],
                    ])
                    ->pluck('user_id');

                $participants->push($group->user_id);

                $group['need_mets_count'] = NeedMet::whereHasMorph(
                        'model',
                        ['App\User'],
                        function ($query) use ($participants) {
                            $query->whereIn('model_id', $participants);
                        }
                    )
                    ->whereBetween('created_at', [
                        $date->copy()->toDateString(),
                        $date->copy()->endOfMonth()->toDateString()
                    ])
                    ->count();

                $group['members_count'] = GroupParticipant::where([
                        ['group_id', $group->id],
                        ['status', 'approved']
                    ])->count();
            } else {
                $group['need_mets_count'] = 0;
                $group['members_count'] = 0;
            }
        }

        return response()->json($groups, 200);
    }

    /**
     * Display user joined/created group.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMyGroup(Request $request)
    {
        $group = Group::where('user_id', auth()->user()->id)
            ->first();

        if (!$group) {
            $hasParticipated = GroupParticipant::where(function($query) {
                    $query->where('user_id', auth()->user()->id)
                        ->whereIn('status', ['approved', 'pending']);
                })->first();

            if ($hasParticipated) {
                $group = Group::find($hasParticipated->group_id);
                $group['member_status'] = $hasParticipated->status;
            } else {
                return response()->json($group);
            }
        }

        $group['goal'] = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function(Builder $query) use ($group) {
                    $query->where('model_id', $group->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        $date = Carbon::parse($group['goal']->created_at);

        if (!$group) {
            $participated = GroupParticipant::where([
                    ['user_id', auth()->user()->id],
                    ['status', 'approved']
                ])
                ->first();

            if ($participated) {
                $group = Group::where('group_id', $participated->group_id)
                    ->first();
            } else {
                return response()->json($participated);
            }
        }

        $participants = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved'],
            ])
            ->pluck('user_id');

        $participants->push($group->user_id);

        $group['need_mets_count'] = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) use ($participants) {
                    $query->whereIn('model_id', $participants);
                }
            )
            ->whereBetween('created_at', [
                $date->copy()->toDateString(),
                $date->copy()->endOfMonth()->toDateString()
            ])
            ->count();

        $group['members_count'] = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved']
            ])->count();

        $group->getMedia();
        $group['photo'] = $group->getFirstMediaUrl('photo');

        return response()->json($group);
    }

    /**
     * Display user joined/created group.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCurrentGroup(Request $request)
    {
        $group = Group::where('user_id', auth()->user()->id)
            ->first();

        if (!$group) {
            $hasParticipated = GroupParticipant::where(function($query) {
                    $query->where('user_id', auth()->user()->id)
                        ->where('status', 'approved');
                })->first();

            if ($hasParticipated) {
                $group = Group::find($hasParticipated->group_id);
                $group['member_status'] = $hasParticipated->status;
            } else {
                return response()->json($group);
            }
        }

        $group['goal'] = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function(Builder $query) use ($group) {
                    $query->where('model_id', $group->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        $date = Carbon::parse($group['goal']->created_at);

        if (!$group) {
            $participated = GroupParticipant::where([
                    ['user_id', auth()->user()->id],
                    ['status', 'approved']
                ])
                ->first();

            if ($participated) {
                $group = Group::where('group_id', $participated->group_id)
                    ->first();
            } else {
                return response()->json($participated);
            }
        }

        $participants = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved'],
            ])
            ->pluck('user_id');

        $participants->push($group->user_id);

        $group['need_mets_count'] = NeedMet::whereHasMorph(
                'model',
                ['App\User'],
                function ($query) use ($participants) {
                    $query->whereIn('model_id', $participants);
                }
            )
            ->whereBetween('created_at', [
                $date->copy()->toDateString(),
                $date->copy()->endOfMonth()->toDateString()
            ])
            ->count();

        $group['members_count'] = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved']
            ])->count();

        $group->getMedia();
        $group['photo'] = $group->getFirstMediaUrl('photo');

        return response()->json($group);
    }

    /**
     * Display join request of a group.
     *
     * @return \Illuminate\Http\Response
     */
    public function getJoinRequest(Request $request, Group $group)
    {
        $participants = GroupParticipant::with('user', 'user.profile')
            ->where('status', 'pending')
            ->where('group_id', $group->id)
            ->get();

        return response()->json($participants, 200);
    }

    /**
     * Display the messages of a group.
     *
     * @return \Illuminate\Http\Response
     */
    public function messages(Request $request, Group $group)
    {
        $chats = GroupChat::with('user', 'user.profile')
            ->where('group_id', $group->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function($q) {
                return Carbon::parse($q->created_at)->calendar();
            });
        
        foreach ($chats as $time) {
            foreach($time as $chat) {
                $chat->getMedia();
            }
        }

        foreach($chats as $time) {
            foreach($time as $chat) {
                foreach($chat['media'] as $media) {
                    $media['publicUrl'] = $media->getFullUrl();
                }
            }
        }

        return response()->json($chats, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupStoreRequest $request)
    {
        $result = DB::transaction(function () use ($request) {
            $group = Group::create(
                    array_merge(
                        request()->only([
                            'name',
                            'description',
                            'privacy',
                            'location',
                            'lat',
                            'lng'
                        ]), ["user_id" => auth()->user()->id]
                    )
                );

            $group->update(['link' => "neuma://group/$group->id"]);
            
            $goal = Goal::make([
                    'need' => 8,
                    'term' => 'year'
                ]);

            $createdGoal = $group->goals()->save($goal);

            $group['goal'] = $createdGoal;

            if ($request->tags) {
                $tags = Tag::createTag($group, $request->tags);
                $group['tags'] = $tags;
            }

            if ($request->hasFile('media')) {
                $group
                    ->addMedia($request->file('media'))
                    ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

                $group->getMedia('photo');
            }

            return $group;
        });

        return response()->json($result, 202);
    }

    /**
     * Add group photo
     *
     * @param  json
     * @return \Illuminate\Http\Response
     */
    public function addPhoto(Request $request, Group $group)
    {
        $group->clearMediaCollection('photo');

        if ($request->get('photo')) {
            $image = $request->get('photo');
            $name = time().'-'.Str::random(20);
            $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            
            $group 
                ->addMediaFromBase64($image)
                ->usingName($name)
                ->usingFileName($name.'.'.$extension)
                ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));

            $group->getMedia('photo');
            
            return response()->json($group, 202);
        }

        return response()->json(['message' => 'Please select a photo.'], 422);
    }

    /**
     * User participating in group
     *
     * @param  json
     * @return \Illuminate\Http\Response
     */
    public function addParticipant(Request $request, Group $group)
    {
        $hasRequest = GroupParticipant::where('user_id', $request->user_id)->first();

        if ($hasRequest) {
            return response()->json([
                'message' => 'You cannot join this group.'
            ], 409);
        }

        $participant = GroupParticipant::create([
                'group_id' => $group->id,
                'user_id' => $request->user_id
            ]);

        return response()->json($participant, 202);
    }
    
    /**
     * Add a new message in group
     *
     * @param  json
     * @return \Illuminate\Http\Response
     */
    public function addMessage(Request $request, Group $group)
    {
        $chat = GroupChat::create([
                'group_id' => $group->id,
                'sender' => auth()->user()->id,
                'message' => $request->message
            ]);

        if ($request->get('attachment')) {
            $image = $request->get('attachment');
            $name = time().'-'.Str::random(20);
            $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            
            $chat 
                ->addMediaFromBase64($image)
                ->usingName($name)
                ->usingFileName($name.'.'.$extension)
                ->toMediaCollection('photo', env('FILESYSTEM_DRIVER'));
        }

        event(new GroupMessageEvent($chat));

        $chat->getMedia();

        foreach($chat['media'] as $media) {
            $media['publicUrl'] = $media->getFullUrl();
        }

        $chat->load('user', 'user.profile');

        return response()->json($chat, 202);
    }
    
    /**
     * Join Request action [approve, deny]
     *
     * @param json
     * @return \Illuminate\Http\Response
     */
    public function joinRequest(Request $request, $id)
    {
        $participant = GroupParticipant::find($id);

        if ($request->status == 'approved') {
            $participant->update(request()->only(['status']));
            
            GroupParticipant::where('user_id', $participant->user_id)
                ->where('status', 'pending')
                ->delete();
        }

        return response()->json($participant, 202);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $date;

        $group = Group::with([
                'user', 
            ])
            ->withCount(['requesting' => function(Builder $query) {
                $query->where('status', 'pending');
            }, 'participants' => function(Builder $query) {
                $query->with('participants.user')
                    ->where('status', 'approved');
            }])
            ->where('id', $id)
            ->firstorFail();

        if ($group) {
            $group['isJoined'] = 0;
        }

        // if (auth()->check()) {
        //     $group['isJoined'] = GroupParticipant::where([
        //             ['group_id', $group->id],
        //             ['user_id', auth()->user()->id],
        //             ['status', 'approved']
        //         ])->count();
        // }

        $group['goal'] = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function (Builder $query) use ($group) {
                    $query->where('model_id', $group->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        if ($group['goal']) {
            $date = Carbon::parse($group['goal']->created_at);
        } else {
            $date = Carbon::parse($group->created_at);
        }

        $group->getMedia();
        $group['photo'] = $group->getFirstMediaUrl('photo');

        $group['requestings'] = GroupParticipant::where([
            ['group_id', $group->id],
            ['status', 'pending'],
        ])
        ->pluck('user_id');

        $participants = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved'],
            ])
            ->pluck('user_id');
        
        $participants->push($group->user_id);

        $group['needs_met_count'] = NeedMet::whereHasMorph(
                'model',
                    ['App\User'],
                    function ($query) use ($participants) {
                        $query->whereIn('model_id', $participants);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString(),
                ])
                ->count();

        return response()->json($group);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function Current(Request $request, $groupId, $userId)
    {
        $date;

        $group = Group::with(['user'])
            ->withCount(['requesting' => function(Builder $query) {
                $query->where('status', 'pending');
            }, 'participants' => function(Builder $query) {
                $query->with('participants.user')
                    ->where('status', 'approved');
            }])
            ->where('id', $groupId)
            ->firstorFail();

        if ($group) {
            $group['isJoined'] = 0;
        }

        if ($userId) {
            $group['isJoined'] = GroupParticipant::where([
                    ['group_id', $group->id],
                    ['user_id', $userId],
                    ['status', 'approved']
                ])->count();

            $group['has_request'] = GroupInvite::where([
                    ['user_id', $userId],
                    ['status', 'pending']
                ])->count();

            if(!$group['has_request']) {
                $group['has_request'] = GroupParticipant::where('user_id', $userId)
                    ->where('status', 'pending')
                    ->orWhere('status', 'approved')
                    ->count();
            }
        }

        $group['goal'] = Goal::whereHasMorph(
                'model',
                ['App\Group'],
                function (Builder $query) use ($group) {
                    $query->where('model_id', $group->id);
                }
            )
            ->where('status', 'in progress')
            ->latest()
            ->first();

        if ($group['goal']) {
            $date = Carbon::parse($group['goal']->created_at);
        } else {
            $date = Carbon::parse($group->created_at);
        }

        $group->getMedia();
        $group['photo'] = $group->getFirstMediaUrl('photo');

        $group['requestings'] = GroupParticipant::where([
            ['group_id', $group->id],
            ['status', 'pending'],
        ])
        ->pluck('user_id');

        $participants = GroupParticipant::where([
                ['group_id', $group->id],
                ['status', 'approved'],
            ])
            ->pluck('user_id');
        
        $participants->push($group->user_id);

        $group['needs_met_count'] = NeedMet::whereHasMorph(
                'model',
                    ['App\User'],
                    function ($query) use ($participants) {
                        $query->whereIn('model_id', $participants);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString(),
                ])
                ->count();

        return response()->json($group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GroupUpdateRequest $request, Group $group)
    {
        $group->update($request->validated());

        return response()->json($group, 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        try {
            $group->delete();
            
            return response()->json([
                    'message' => 'Group successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }

    /**
     * Search user's to invite
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function searchPeople(Request $request)
    {
        $users = User::where('name', 'like', '%'.$request->searchName.'%')
            ->with('profile')
            ->get();

        return response()->json($users);
    }

    /**
     * Display a listing of the resource nearby.
     *
     * @return \Illuminate\Http\Response
     */
    public function suggestedNearby(Request $request, $lat, $lng)
    {
        $groups = Group::select('groups.*')
            ->selectRaw('( 6371 * acos( cos( radians(?) ) 
                * cos( radians( lat ) ) * cos( radians( lng ) 
                - radians(?) ) + sin( radians(?) ) 
                * sin( radians( lat ) ) ) ) AS distance', 
                [$lat, $lng, $lat])
            ->orderBy('distance')
            ->limit(10)
            ->get();
        
        foreach($groups as $group) {
            $group['type'] = 'church';
            $group['photo'] = $group->getFirstMediaUrl('photo');
            $group['cover_photo'] = $group->getFirstMediaUrl('cover_photo');

            $group['goal'] = Goal::whereHasMorph(
                    'model',
                    ['App\Group'],
                    function(Builder $query) use ($group) {
                        $query->where('model_id', $group->id);
                    }
                )
                ->where('status', 'in progress')
                ->latest()
                ->first();

            $date = $group['goal'] 
                ? Carbon::parse($group['goal']->created_at)
                : $group->created_at;

            $participants = GroupParticipant::where([
                    ['group_id', $group->id],
                    ['status', 'approved'],
                ])
                ->pluck('user_id');

            $participants->push($group->user_id);

            $group['need_mets_count'] = NeedMet::whereHasMorph(
                    'model',
                    ['App\User'],
                    function ($query) use ($participants) {
                        $query->whereIn('model_id', $participants);
                    }
                )
                ->whereBetween('created_at', [
                    $date->copy()->toDateString(),
                    $date->copy()->endOfMonth()->toDateString()
                ])
                ->count();

            $group['members_count'] = GroupParticipant::where([
                    ['group_id', $group->id],
                    ['status', 'approved']
                ])->count();
        } 

        return response()->json($groups->toArray(), 200);
    }
}
