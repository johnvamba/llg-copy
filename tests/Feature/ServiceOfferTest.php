<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use App\User;
use App\UserProfile;
use App\Content;
use App\ServiceType;
use App\ServiceOffer;

class ServiceOfferTest extends TestCase
{
    protected $user;
    protected $service;
    protected $serviceType;
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

        $this->serviceType = factory(ServiceType::class)->create();

        $this->content = factory(Content::class)->create([
                'user_id' => $this->user->id,
                'type' => 'service'
            ]);

        $this->service = factory(ServiceOffer::class)->make([
                'content_id' => $this->content->id,
                'service_type_id' => $this->serviceType->id
            ]);
    }

    /** @test */
    public function a_user_can_create_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/service-offer', [
                'serviceType' => $this->serviceType->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
                'status' => 'pending'
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }
    
    /** @test */
    public function a_user_can_create_service_offer_type_other()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/service-offer', [
                'serviceType' => $this->serviceType->id,
                'name' => $this->faker->text,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
                'status' => 'pending'
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_can_create_service_offer_without_service_type()
    {
        $this->actingAs($this->user, 'api');

        $response = $this->json('POST', 'api/service-offer', [
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
                'status' => 'pending'
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function a_user_can_create_service_offer_with_tags()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/service-offer', [
                'serviceType' => $this->serviceType->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
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
    public function a_user_can_delete_service_offer()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $content = $this->content;

        $response = $this->delete("api/service-offer/{$content->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('service_offers', $content->toArray());
    }

    /** @test */
    public function a_user_can_fetch_service_offer()
    {
        $this->actingAs($this->user, 'api');
        $this->withoutExceptionHandling();

        $service = $this->service->save();

        $response = $this->get('api/service-offer');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    /** @test */
    public function a_user_can_view_service_offer()
    {
        $this->actingAs($this->user, 'api');
        $this->withoutExceptionHandling();

        $content = factory(Content::class)->create([
                'user_id' => $this->user->id,
                'type' => 'service',
            ]);

        factory(ServiceOffer::class)->create([
            'content_id' => $content->id,
            'service_type_id' => $this->serviceType->id
        ]);

        $response = $this->get("api/service-offer/{$content->id}");

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
                'service_offer'
            ]);
    }

    /** @test */
    public function a_user_can_create_service_offer_with_media()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/service-offer', [
                'serviceType' => $this->serviceType->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
                'status' => 'pending',
                'media' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_can_create_service_offer_with_media_and_tags()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/service-offer', [
                'serviceType' => $this->serviceType->id,
                'title' => $this->faker->text,
                'description' => $this->faker->text,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'type' => 'service',
                'status' => 'pending',
                'tags' => $this->faker->words,
                'media' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

}
