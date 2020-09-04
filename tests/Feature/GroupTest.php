<?php

namespace Tests\Feature;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\Group;
use App\Goal;
use App\GroupChat;
use App\GroupParticipant;

class GroupTest extends TestCase
{
    protected $admin;
    protected $user;
    protected $gues;
    protected $goalTerm;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        $this->admin = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->admin->id,
            'preference' => json_encode(['Health', 'Food'])
        ]);
        $this->admin->assignRole('admin');
        
        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id,
            'preference' => json_encode(['Health', 'Food'])
        ]);
        $this->user->assignRole('user');

        $this->guest = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id,
            'preference' => json_encode(['Health', 'Food'])
        ]);
        $this->guest->assignRole('user');

        $this->goalTerm = ['month', 'year'];
    }

    /** @test */
    public function a_user_can_create_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'privacy' => 'public',
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_create_group_with_media()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'privacy' => 'public',
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20,
                'media' => $file
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_create_group_with_media_and_tags()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/groups', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'privacy' => 'public',
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20,
                'tags' => $this->faker->words,
                'media' => $file
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_groups()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        factory(Group::class, 5)->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->get('api/groups');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_view_group()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);

        $response = $this->get("api/groups/{$group->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_update_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);

        $response = $this->patch("api/groups/{$group->id}", [
                'description' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_delete_group()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);

        $response = $this->delete("api/groups/{$group->id}");

        $response->assertStatus(204);
    }

    /** @test */
    public function a_user_can_participate_in_a_group()
    {
        $this->actingAs($this->guest, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);

        $response = $this->post("api/groups/{$group->id}/participate");

        $response->assertStatus(202);
    }

    /** @test */
    public function a_grou_owner_can_check_join_request()
    {
        $this->actingAs($this->guest, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);
        factory(GroupParticipant::class)->create([
            'group_id' => $group->id,
            'user_id' => $this->guest->id,
            'status' => 'pending'
        ]);

        $response = $this->get("api/groups/{$group->id}/join-request");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_group_owner_can_approved_participant()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);
        $participant = factory(GroupParticipant::class)->create([
            'group_id' => $group->id,
            'user_id' => $this->guest->id
        ]);

        $response = $this->post("api/groups/join-request/{$participant->id}", [
                "status" => 'approved'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_send_message_in_a_group()
    {
        $this->actingAs($this->guest, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);
        factory(GroupParticipant::class)->create([
            'group_id' => $group->id,
            'user_id' => $this->guest->id,
            'status' => 'approved'
        ]);

        $response = $this->post("api/groups/message/{$group->id}", [
                "message" => 'new message'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_message_of_group()
    {
        $this->actingAs($this->guest, 'api');

        $this->withoutExceptionHandling();

        $group = factory(Group::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Goal::class)->make([
            'model_id' => $group->id,
            'model_type' => 'App\Group'
        ]);
        factory(GroupParticipant::class)->create([
            'group_id' => $group->id,
            'user_id' => $this->guest->id,
            'status' => 'approved'
        ]);
        factory(GroupChat::class,3)->create([
            'group_id' => $group->id,
            'sender' => $this->guest->id,
            'message' => $this->faker->text
        ]);

        $response = $this->get("api/groups/messages/{$group->id}");

        $response->assertStatus(200);
    }
}
