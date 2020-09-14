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
                'preference' => json_encode(['Health', 'Food'])
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
                'name' => $this->faker->name,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
                'preference' => [
                    'Housing',
                    'Food',
                    'Health'
                ]
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

        $response = $this->json('PATCH', "api/users/{$this->user->id}", $params);

        $response->assertStatus(202);
        $response->assertJsonStructure(['message']);

        Storage::disk('public')->assertExists("img/{$file->hashName()}");
    }

    /** @test */
    public function a_admin_can_fetch_all_users()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/users");
        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
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

        $response = $this->json('POST', "api/users/", [
                'name' => $this->faker->name,
                'age' => 18,
                'location' => $this->faker->address,
                'lat' => 12.323,
                'lng' => 12.323,
                'bio' => $this->faker->text,
                'email' => $this->faker->email,
                'password' => 'secret',
                'password_confirmation' => 'secre',
                'photo' => $file
            ]);

        $response->assertStatus(202);
    }
}
