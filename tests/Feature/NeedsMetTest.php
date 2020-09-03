<?php

namespace Tests\Feature;

use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\User;
use App\UserProfile;
use App\Content;
use App\NeedsMetType;
use App\NeedsMetCategory;
use App\NeedsMet;

class NeedsMetTest extends TestCase
{
    protected $user;
    protected $needs;
    protected $category;
    protected $needsType;
    protected $content;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'user']);

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $this->user->assignRole('user');

        $this->category = factory(NeedsMetCategory::class)->create();
        $this->needsType = factory(NeedsMetType::class)->create();

        $this->content = factory(Content::class)->create([
                'user_id' => $this->user->id,
                'type' => 'needs',
            ]);

        $this->needs = factory(NeedsMet::class)->make([
                'content_id' => $this->content->id,
                'needs_met_category_id' => $this->category->id,
                'needs_met_type_id' => $this->needsType->id
            ]);
    }

    /** @test */
    public function a_user_can_create_needs_met()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/needs-met', [
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
                'status' => 'pending'
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_cant_create_needs_met_no_title()
    {
        $this->actingAs($this->user, 'api');

        $response = $this->json('POST','api/needs-met', [
                'needsCategory' => $this->category->id,
                'needsType' => $this->needsType->id,
                'description' => $this->faker->text,
                'goal' => 100.00,
                'raised' => 50.00,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'needs',
                'status' => 'pending'
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function a_user_can_create_needs_met_with_tags()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/needs-met', [
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
                'data'
            ]);
    }

    /** @test */
    public function a_user_can_update_needs_met()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();
        $this->needs->save();

        $response = $this->patch("api/needs-met/{$this->content->id}", [
                'needs_met_category_id' => $this->category->id,
                'needs_met_type_id' => $this->needsType->id,
                'title' => 'new title',
                'description' => $this->content->description,
                'goal' => $this->needs->goal,
                'raised' => 100.00,
                'location' => $this->needs->location,
                'lat' => $this->needs->lat,
                'lng' => $this->needs->lng,
                'type' => $this->content->type,
                'status' => $this->content->status
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'id',
                'title',
                'description',
                'type',
                'status',
                'created_at',
                'updated_at',
                'needs_met'
            ]);
    }

    /** @test */
    public function a_user_can_delete_needs_met()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $content = $this->content;
        $response = $this->delete("api/needs-met/{$content->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('needs_mets', $content->toArray());
    }

    /** @test */
    public function a_user_can_fetch_needs_met()
    {
        $this->actingAs($this->user, 'api');
        $this->withoutExceptionHandling();

        $this->needs->save();

        $response = $this->get('api/needs-met');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    /** @test */
    public function a_user_can_view_needs_met()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $content = factory(Content::class)->create([
                'user_id' => $this->user->id,
                'type' => 'needs',
            ]);

        factory(NeedsMet::class)->create([
            'content_id' => $content->id,
            'needs_met_category_id' => $this->category->id,
            'needs_met_type_id' => $this->needsType->id
        ]);

        $response = $this->get("api/needs-met/{$content->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
                'id',
                'user_id',
                'title',
                'description',
                'type',
                'created_at',
                'updated_at',
                'deleted_at',
                'needs_met'
            ]);
    }

    public function a_user_can_fetch_nearby_needs()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $contents = factory(Content::class, 4)->create([
            'user_id' => $this->user->id,
            'type' => 'needs',
        ]);

        foreach($contents as $content) {
            factory(NeedsMet::class)->create([
                'content_id' => $content->id,
                'needs_met_category_id' => $this->category->id,
                'needs_met_type_id' => $this->needsType->id
            ]);
        }

        $response = $this->json(
                "POST",
                "api/needs-met/nearby/{$this->faker->latitude}/{$this->faker->longitude}"
            );

        $response->assertStatus(200);
    }

}
