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

class OrganizationTest extends TestCase
{
    protected $admin;
    protected $user;

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
    }

    /** @test */
    public function a_org_admin_can_create_organization()
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
    }

    /** @test */
    public function a_org_admin_can_create_organization_with_media()
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

        $response = $this->post('api/organizations', [
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

        $response = $this->patch("api/organizations/{$selectedOrg->id}", [
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

        $response = $this->patch("api/organizations/{$selectedOrg->id}", [
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
    public function a_org_admin_can_fetc_stripe_account()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();
        
        $org = factory(Organization::class)->create();

        $response = $this->get("api/organizations/{$org->id}/credential");

        $response->assertStatus(200);
    }
}

