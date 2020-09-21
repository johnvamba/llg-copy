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
use App\NeedsType;
use App\NeedsCategory;
use App\Need;

class NeedTest extends TestCase
{
    protected $admin;
    protected $user;
    protected $org;
    protected $need;
    protected $type;
    protected $category;

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
        $this->type = factory(NeedsType::class)->create();
        $this->category = factory(NeedsCategory::class, 5)->create();
    }

    /** @test */
    public function a_org_admin_can_create_needs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/needs', [
                'organization' => $this->org->id,
                'category' => $categories,
                'needs_type_id' => $this->type->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'raised' => 50.00,
                'goal' => 100.00,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_create_needs_tags()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/needs', [
                'organization' => $this->org->id,
                'category' => $categories,
                'needs_type_id' => $this->type->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'raised' => 50.00,
                'goal' => 100.00,
                'tags' => json_encode($this->faker->words)
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_create_needs_with_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');
        
        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/needs', [
                'organization' => $this->org->id,
                'category' => $categories,
                'needs_type_id' => $this->type->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'raised' => 50.00,
                'goal' => 100.00,
                'tags' => json_encode($this->faker->words),
                'photo' => $file
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_get_needs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/need/lists', [
                'limit' => 5
            ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_fetch_recent_added_needs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $response = $this->get('api/need/recent-added');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_fetch_total_needs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $response = $this->get('api/needs/open/total');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_fetch_needs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $response = $this->get('api/needs');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_view_need()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $need = $needs[0];

        $response = $this->get("api/needs/{$need->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_update_need()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $need = $needs[0];

        $response = $this->patch("api/needs/{$need->id}", [
                'title' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_delete_need()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_type_id' => $this->type->id,
        ]);

        $need = $needs[0];

        $response = $this->delete("api/needs/{$need->id}");

        $response->assertStatus(204);
    }
}
