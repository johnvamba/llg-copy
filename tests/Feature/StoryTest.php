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
use App\Organization;
use App\Story;

class StoryTest extends TestCase
{
    protected $admin;
    protected $user;
    protected $org;
    protected $service;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'organization admin']);
        Role::create(['name' => 'user']);

        $this->admin = factory(User::class)->create();
        factory(UserProfile::class)->make([
                'user_id' => $this->admin->id
            ]);
        $this->admin->assignRole('organization admin');

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id,
            'preference' => json_encode(['Health', 'Food'])
        ]);
        $this->user->assignRole('user');

        $this->org = factory(Organization::class)->create();
    }    

    /** @test */
    public function a_org_can_create_story()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/stories', [
                'organization_id' => $this->org->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'featured_start_date' => '2020-09-03',
                'featured_end_date' => '2020-09-05'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_can_create_story_with_tags()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/stories', [
                'organization_id' => $this->org->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'featured_start_date' => '2020-09-03',
                'featured_end_date' => '2020-09-05',
                'tags' => json_encode($this->faker->words)
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_fetch_stories()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $response = $this->post('api/story/lists', [
                'limit' => 5
            ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_fetch_stories()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $response = $this->get('api/stories');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_view_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $response = $this->get("api/stories/{$story->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_org_admin_can_update_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $response = $this->patch("api/stories/{$story->id}", [
                'title' => $this->faker->text,
                'featured_start_date' => '2020-09-03',
                'featured_end_date' => '2020-09-10'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_delete_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $response = $this->delete("api/stories/{$story->id}");

        $response->assertStatus(204);
    }

    /** @test */
    public function a_user_can_appreciate_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $response = $this->post("api/stories/{$story->id}/appreciate");

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_featured_story()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $date = \Carbon\Carbon::now();

        $response = $this->patch("api/stories/{$story->id}", [
                'featured_start_date' => $date->toDateString(),
                'featured_end_date' => $date->addDays(5)->toDateString()
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_comment_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $stories = factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $story = $stories[0];

        $response = $this->post("api/stories/{$story->id}/comments", [
                'comment' => 'nice story'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_featured_story()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        factory(Story::class, 5)->create([
            'organization_id' => $this->org->id,
            'user_id' => $this->admin->id
        ]);

        $response = $this->get("api/featured/stories");

        $response->assertStatus(200);
    }
}
