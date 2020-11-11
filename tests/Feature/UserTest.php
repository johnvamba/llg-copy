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
use App\NeedsCategory;
use App\Organization;

class UserTest extends TestCase
{

    protected $admin;
    protected $user;
    protected $profile;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        $this->admin = factory(User::class)->create();
        factory(UserProfile::class)->make([
                'user_id' => $this->admin->id
            ]);
        $this->admin->assignRole('admin');

        $this->user = factory(User::class)->create();
        $this->profile = factory(UserProfile::class)->create([
                'user_id' => $this->user->id,
            ]);
        $this->user->assignRole('user');

        factory(NeedsCategory::class)->create();
    }

    /** @test */
    public function a_user_can_register_without_photo()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/register', [
                'email' => $this->faker->unique()->safeEmail,
                'password' => $this->faker->password,
                'firstName' => $this->faker->firstName,
                'lastName' => $this->faker->lastName,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_cant_register_using_email_exist()
    {
        $response = $this->json('POST', 'api/register', [
                'email' => $this->user->email,
                'password' => $this->faker->password,
                'firstName' => $this->faker->firstName,
                'lastName' => $this->faker->lastName,
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
                'firstName' => $this->faker->firstName,
                'lastName' => $this->faker->lastName,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
                'photo' => $file
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);

        Storage::disk('public')->assertExists("img/{$file->hashName()}");
    }

    /** @test */
    public function a_user_can_register_with_info()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/register/info', [
                'email' => $this->faker->unique()->safeEmail,
                'firstName' => $this->faker->firstName,
                'lastName' => $this->faker->firstName,
                'age' => 20,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_register_with_location()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/register/location', [
                'id' => $this->profile->id,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_upload_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post('api/register/upload-photo', [
                'id' => $this->profile->id,
                'photo' => $file,
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_update_its_profile_without_photo()
    {
        Storage::fake('public');

        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $params = array_merge(
                $this->user->toArray(),
                $this->profile->toArray()
            );
        $params['id'] = $this->user->id;
        $params['firstName'] = $this->profile->first_name;
        $params['lastName'] = $this->profile->last_name;

        $response = $this->json('PATCH', "api/users/{$this->user->id}", $params);

        $response->assertStatus(202);
        $response->assertJsonStructure(['message']);
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
        $params['id'] = $this->user->id;
        $params['firstName'] = $this->profile->first_name;
        $params['lastName'] = $this->profile->last_name;

        $response = $this->json('PATCH', "api/users/{$this->user->id}", $params);

        $response->assertStatus(202);
        $response->assertJsonStructure(['message']);
    }

    /** @test */
    public function a_admin_can_fetch_all_users()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/users");
        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_fetch_all_users_chunk()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post("api/users/lists");
        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_view_a_user_profile()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/users/{$this->user->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure(['data']);
    }

    /** @test */
    public function a_admin_can_delete_a_user()
    {
        $this->actingAs($this->admin, 'api');

        $user = factory(User::class)->create();
        $response = $this->delete("api/users/{$user->id}");
        $response->assertStatus(204);
        
        $this->assertDatabaseMissing(
                'users', 
                $user->toArray()
            );
    }

    /** @test */
    public function a_admin_can_add_user()
    {
        Storage::fake('public');

        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $file = UploadedFile::fake()->image('avatar.jpg');

        $response = $this->post("api/users/", [
                'firstName' => $this->faker->firstName,
                'lastName' => $this->faker->lastName,
                'email' => $this->faker->email,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => 12.323,
                'lng' => 12.323,
                'bio' => $this->faker->text,
                'password' => 'password',
                'password_confirmation' => 'password',
                'photo' => $file,
                'role' => 2
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_get_user_statistics()
    {
        $this->actingAs($this->admin, 'api');

        $response = $this->get('api/user/stats');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_get_its_info()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get('api/user/me');

        $response->assertStatus(200);
    }
}
