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
use App\Content;

class StoryTest extends TestCase
{
    protected $org;
    protected $user;
    protected $content;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'user']);
        Role::create(['name' => 'organisation admin']);

        $this->org = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->org->id
        ]);
        $this->org->assignRole('organisation admin');

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $this->org->assignRole('user');

        $this->content = factory(Content::class)->create([
            'user_id' => $this->user->id,
            'type' => 'story'
        ]);
    }

    /** @test */
    public function a_org_admin_can_create_story_without_media_and_tags()
    {
        $this->actingAs($this->org, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post("api/stories/", [
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'type' => 'story'
            ]);
        
        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_org_admin_can_create_story_has_tags_without_media()
    {
        $this->actingAs($this->org, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post("api/stories/", [
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'type' => 'story',
                'tags' => $this->faker->words
            ]);
        
        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_org_admin_can_create_story_has_media_without_tag()
    {
        Storage::fake('public');

        $this->actingAs($this->org, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post("api/stories/", [
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'type' => 'story',
                'media' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_org_admin_can_create_story_has_media_and_tag()
    {
        Storage::fake('public');

        $this->actingAs($this->org, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post("api/stories/", [
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'type' => 'story',
                'tags' => $this->faker->words,
                'media' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_org_admin_can_delete_story()
    {
        $this->actingAs($this->org, 'api');

        $this->withoutExceptionHandling();


        $content = $this->content;
        $response = $this->delete("api/stories/{$this->content->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('contents', $content->toArray());
    }

    /** @test */
    public function a_user_can_fetch_stories()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/stories");

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    /** @test */
    public function a_user_can_view_stories()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/stories/{$this->content->id}");

        $response->assertStatus(200);
    }
}
