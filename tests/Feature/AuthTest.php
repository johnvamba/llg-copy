<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;
use App\User;

class AuthTest extends TestCase
{
    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function a_user_can_login()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/login', [
                'email' => $this->user->email,
                'password' => 'password'
            ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
                'message',
                'token'
            ]);
    }

    /** @test */
    public function a_user_cant_login_invalid_password()
    {
        $response = $this->post('api/login', [
                'email' => $this->user->email,
                'password' => '12345678'
            ]);

        $response->assertStatus(401);
    }
}
