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
use App\Content;
use App\Community;
use App\NeedsMet;
use App\NeedsMetType;
use App\NeedsMetCategory;
use App\CommunityContent;

class OrganizationTest extends TestCase
{
    protected $admin;
    protected $user;
    protected $community;
    protected $goalTerm;
    protected $category;
    protected $needsType;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'campus admin']);
        Role::create(['name' => 'user']);

        $this->admin = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->admin->id
        ]);
        $this->admin->assignRole('campus admin');

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $this->user->assignRole('user');

        $this->category = factory(NeedsMetCategory::class)->create();
        $this->needsType = factory(NeedsMetType::class)->create();

        $this->community = factory(Community::class)->create([
            'privacy' => 'public',
            'type' => 'organization'
        ]);

        $content = factory(Content::class)->create([
            'user_id' => $this->admin->id,
            'type' => 'needs',
        ]);

        factory(NeedsMet::class)->make([
            'content_id' => $content->id,
            'needs_met_category_id' => $this->category->id,
            'needs_met_type_id' => $this->needsType->id
        ]);

        factory(CommunityContent::class)->create([
            'community_id' => $this->community->id,
            'content_id' => $content->id
        ]);

        $this->goalTerm = ['month', 'year'];
    }

    /** @test */
    public function a_admin_can_create_organization_without_photo()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/organizations', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude
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
                    'type',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    /** @test */
    public function a_admin_can_create_organization_with_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/organizations', [
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'media' => $file
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
                    'type',
                    'created_at',
                    'updated_at',
                    'media'
                ]
            ]);
    }

    /** @test */
    public function a_admin_cant_create_organization_without_name()
    {
        $this->actingAs($this->admin, 'api');

        $response = $this->json('POST', 'api/organizations', [
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function a_admin_can_create_needs_in_organization()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post("api/organizations/{$this->community->id}/needs-met", [
                'needsCategory' => $this->category->id,
                'needsType' => $this->needsType->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'goal' => 100.00,
                'raised' => 50.00,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'needs',
                'status' => 'pending',
                'tags' => $this->faker->words
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'title',
                'description',
                'community',
                'needs_met'
            ]
        ]);
    }

    /** @test */
    public function a_user_can_fetch_organizations_with_contents()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/organizations");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_view_organization()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/organizations/{$this->community->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_update_organization()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->patch("api/organizations/{$this->community->id}", [
                'name' => $this->community->name,
                'description' => $this->faker->text,
                'location' => $this->community->location,
                'lat' => $this->community->lat,
                'lng' => $this->community->lng,
                'type' => $this->community->type
            ]);

        $response->assertStatus(202);
    }
}
