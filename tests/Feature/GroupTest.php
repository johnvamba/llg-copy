<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\Community;
use App\Group;
use App\GroupParticipant;
use App\GroupChat;

class GroupTest extends TestCase
{
    protected $user;
    protected $community;
    protected $group;
    protected $goalTerm;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'user']);

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $this->user->assignRole('user');

        $this->community = factory(Community::class)->create([
            'privacy' => 'public',
            'type' => 'group'
        ]);

        $this->group = factory(Group::class)->create([
                'community_id' => $this->community->id,
                'user_id' => $this->user->id
            ]);

        $this->goalTerm = ['month', 'year'];
    }

    /** @test */
    public function a_user_can_create_group_without_photo()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'privacy' => 'public',
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'name',
                    'description',
                    'location',
                    'lat',
                    'lng',
                    'privacy',
                    'type',
                    'created_at',
                    'updated_at',
                    'group'
                ]
            ]);
    }

    /** @test */
    public function a_user_can_create_group_with_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'privacy' => 'public',
                'media' => $file,
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'name',
                    'description',
                    'location',
                    'lat',
                    'lng',
                    'privacy',
                    'type',
                    'created_at',
                    'updated_at',
                    'group',
                    'media'
                ]
            ]);
    }

    /** @test */
    public function a_user_cant_create_group_without_name()
    {
        $this->actingAs($this->user, 'api');

        $response = $this->json('POST', 'api/groups', [
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'privacy' => 'public',
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function a_user_can_be_a_participant_in_a_group()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $user->assignRole('user');

        $this->actingAs($user, 'api');

        $response = $this->post("api/groups/participant/{$this->group->id}");

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data' => [
                    'group_id',
                    'user_id',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    /** @test */
    public function a_user_can_fetch_groups()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/groups");

        $response->assertStatus(200);
        $response->assertJsonCount(1,'data');
    }

    /** @test */
    public function a_user_can_view_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/groups/{$this->community->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
                'id',
                'name',
                'description',
                'location',
                'lat',
                'lng',
                'privacy',
                'type',
                'status',
                'group' => [
                    'participants'
                ],
                'media'
            ]);
    }

    /** @test */
    public function a_user_can_update_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->patch("api/groups/{$this->community->id}", [
                'privacy' => 'private'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_delete_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->delete("api/groups/{$this->group->id}");

        $response->assertStatus(204);
    }

    /** @test */
    public function a_group_owner_can_accept_participant()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $user->id
        ]);
        $user->assignRole('user');
        factory(GroupParticipant::class)->create([
            'group_id' => $this->group->id,
            'user_id' => $user->id,
            'status' => 'pending'
        ]);

        $this->actingAs($this->user, 'api');

        $response = $this->post("api/groups/join-request/{$this->group->id}", [
                'participant' => $user->id,
                'status' => 'approved'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_group_owner_can_deny_participant()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $user->id
        ]);
        $user->assignRole('user');
        factory(GroupParticipant::class)->create([
            'group_id' => $this->group->id,
            'user_id' => $user->id,
            'status' => 'pending'
        ]);

        $this->actingAs($this->user, 'api');

        $response = $this->post("api/groups/join-request/{$this->group->id}", [
                'participant' => $user->id,
                'status' => 'denied'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_group_owner_can_fetch_participants()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $user->id
        ]);
        $user->assignRole('user');
        factory(GroupParticipant::class)->create([
            'group_id' => $this->group->id,
            'user_id' => $user->id,
            'status' => 'pending'
        ]);

        $this->actingAs($this->user, 'api');

        $response = $this->get("api/groups/join-request/{$this->group->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_send_message_in_group()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $user->id
        ]);
        $user->assignRole('user');
        factory(GroupParticipant::class)->create([
            'group_id' => $this->group->id,
            'user_id' => $user->id,
            'status' => 'approved'
        ]);

        $this->actingAs($user, 'api');

        $response = $this->post("api/groups/message/send", [
                'group_id' => $this->group->id,
                'message' => 'new message'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_messages_in_group()
    {
        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $user->id
        ]);
        $user->assignRole('user');
        factory(GroupParticipant::class)->create([
            'group_id' => $this->group->id,
            'user_id' => $user->id,
            'status' => 'approved'
        ]);

        $this->actingAs($user, 'api');

        factory(GroupChat::class)->create([
            'group_id' => $this->group->id,
            'sender' => $this->user->id
        ]);

        $response = $this->get("api/groups/messages/{$this->group->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_create_group_and_set_goal()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'privacy' => 'public',
                'media' => $file,
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'name',
                    'description',
                    'location',
                    'lat',
                    'lng',
                    'privacy',
                    'type',
                    'created_at',
                    'updated_at',
                    'group',
                    'media'
                ]
            ]);
    }

}
