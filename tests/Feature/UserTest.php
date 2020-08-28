<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Tests\TestCase;
use App\User;
use App\UserProfile;

class UserTest extends TestCase
{

    protected $user;
    protected $profile;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'user']);

        $this->user = factory(User::class)->create();
        $this->profile = factory(UserProfile::class)->create([
                'user_id' => $this->user->id
            ]);
    }

    /** @test */
    public function a_user_can_register_without_photo()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/register', [
                'email' => $this->faker->unique()->safeEmail,
                'password' => $this->faker->password,
                'name' => $this->faker->name,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'success',
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_cant_register_using_email_exist()
    {
        $user = factory(User::class)->create();

        factory(UserProfile::class)->make([
                'user_id' => $user->id 
            ]);

        $response = $this->json('POST', 'api/register', [
                'email' => $user->email,
                'password' => $this->faker->password,
                'name' => $this->faker->name,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function a_user_can_register_with_photo()
    {
        Storage::fake('public');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->json('POST', 'api/register', [
                'email' => $this->faker->unique()->safeEmail,
                'password' => $this->faker->password,
                'name' => $this->faker->name,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
                'photo' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'success',
                'message',
                'data'
            ]);

        Storage::disk('public')->assertExists("img/{$file->hashName()}");
    }

    /** @test */
    public function a_user_can_update_its_profile_without_photo()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $params = array_merge(
                $this->user->toArray(),
                $this->profile->toArray()
            );

        $response = $this->json('PATCH', "api/users/{$this->user->id}", $params);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'success',
                'message'
            ]);
    }

    /** @test */
    public function a_user_can_update_its_profile_with_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $params = array_merge(
                $this->user->toArray(),
                $this->profile->toArray(),
                ['photo' => $file]
            );

        $response = $this->json('PATCH', "api/users/{$this->user->id}", $params);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'success',
                'message'
            ]);

        Storage::disk('public')->assertExists("img/{$file->hashName()}");
    }
}
