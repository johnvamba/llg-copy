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
use App\OrganizationCategory;
use App\OrganizationMember;

class OrganizationTest extends TestCase
{
    protected $superadmin;
    protected $admin;
    protected $user;
    protected $category;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'organization admin']);
        Role::create(['name' => 'user']);

        $this->superadmin = factory(User::class)->create();
        factory(UserProfile::class)->make([
                'user_id' => $this->superadmin->id
            ]);
        $this->superadmin->assignRole('admin');
        
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

        $this->category = factory(OrganizationCategory::class, 5)->create();
    }

    /** @test */
    public function a_org_admin_can_create_organization()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/organizations', [
                'category' => $categories,
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_create_organization_with_media()
    {
        Storage::fake('public');

        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/organizations', [
                'category' => $categories,
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'photo' => $file,
                'cover_photo' => $file,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_create_organization_with_stripe_credentials()
    {
        Storage::fake('public');

        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->post('api/organizations', [
                'category' => $categories,
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'photo' => $file,
                'cover_photo' => $file,
                'secretKey' => $this->faker->text,
                'publishableKey' => $this->faker->text,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_fetch_orgs()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        factory(Organization::class, 4)->create();

        $response = $this->get('api/organizations');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_org_admin_can_view_org()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class, 4)->create();
        $selectedOrg = $org[0];

        $response = $this->get("api/organizations/{$selectedOrg->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_org_admin_can_update_org()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class, 4)->create();
        $selectedOrg = $org[0];

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->patch("api/organizations/{$selectedOrg->id}", [
                'category' => $categories,
                'name' => $this->faker->text,
                'description' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_update_org_with_stripe_keys()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class, 4)->create();
        $selectedOrg = $org[0];

        $categories = [];
        foreach($this->category as $data) {
            array_push($categories, $data->id);
        }

        $response = $this->patch("api/organizations/{$selectedOrg->id}", [
                'categories' => [],
                'category' => $categories,
                'name' => $this->faker->text,
                'description' => $this->faker->text,
                'secretKey' => $this->faker->text,
                'publishableKey' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_delete_org()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class, 4)->create();
        $selectedOrg = $org[0];

        $response = $this->delete("api/organizations/{$selectedOrg->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('organizations', $selectedOrg->toArray());
    }

    /** @test */
    public function a_org_admin_can_add_stripe_account()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();

        $response = $this->post("api/organizations/{$org->id}/credential", [
                'secret_key' => 'secret',
                'publishable_key' => 'publish'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_fetch_stripe_account()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();

        $response = $this->get("api/organizations/{$org->id}/credential");

        $response->assertStatus(200);
    }
    
    /** @test */
    public function a_admin_can_add_org_admin_in_organization()
    {
        $this->actingAs($this->superadmin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();

        $response = $this->post("api/organization-members", [
                'organization_id' => $org->id,
                'user' => $this->admin->id,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_get_members_in_organization()
    {
        $this->actingAs($this->superadmin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();

        $response = $this->get("api/organization/{$org->id}/members");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_delete_member_in_organization()
    {
        $this->actingAs($this->superadmin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();
        $member = factory(OrganizationMember::class)->create([
            'organization_id' => $org->id,
            'model_type' => 'App\User',
            'model_id' => $this->admin->id,
        ]);

        $response = $this->delete("api/organization-members/{$member->id}");

        $response->assertStatus(204);
    }
}

