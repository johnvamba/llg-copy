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
use App\ServiceType;
use App\ServiceOffer;

class ServiceOfferTest extends TestCase
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
        $this->service = factory(ServiceType::class)->create();
    }

    /** @test */
    public function a_user_can_create_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/service-offer', [
                'service_type_id' => $this->service->id,
                'organization_id' => $this->org->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_create_service_offer_with_tags()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/service-offer', [
                'service_type_id' => $this->service->id,
                'organization_id' => $this->org->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'tags' => json_encode($this->faker->words)
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_create_service_offer_with_tags_and_media()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/service-offer', [
                'service_type_id' => $this->service->id,
                'organization_id' => $this->org->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'tags' => json_encode($this->faker->words),
                'media' => $file
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_service_offers()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id
        ]);

        $response = $this->get('api/service-offer');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_get_service_offers()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id
        ]);

        $response = $this->post('api/offer/lists', [
                'limit' => 5
            ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_view_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $services = factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id
        ]);

        $offer = $services[0];

        $response = $this->get("api/service-offer/{$offer->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_update_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $services = factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id
        ]);

        $offer = $services[0];

        $response = $this->patch("api/service-offer/{$offer->id}", [
                'title' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_delete_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $services = factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id
        ]);

        $offer = $services[0];

        $response = $this->delete("api/service-offer/{$offer->id}");

        $response->assertStatus(204);
    }

    /** @test */
    public function a_org_admin_can_approve_request()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $services = factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id,
        ]);

        $offer = $services[0];

        $response = $this->post("api/service-offer/{$offer->id}/request", [
                'status' => 'approved'
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_org_admin_can_get_request()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $services = factory(ServiceOffer::class, 5)->create([
            'service_type_id' => $this->service->id,
            'organization_id' => $this->org->id,
            'user_id' => $this->user->id,
        ]);

        $response = $this->get("api/service-offer/user/request");

        $response->assertStatus(200);
    }
}