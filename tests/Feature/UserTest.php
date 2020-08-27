<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function a_user_can_register_without_photo()
    {
        $this->withoutExceptionHandling();

        $response = $this->post('api/register', [
                'email' => $this->faker->unique()->safeEmail,
                'password' => $this->faker->password,
                'name' => $this->faker->name,
                'location' => $this->faker->address,
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'bio' => $this->faker->text,
                'age' => $this->faker->unique()->randomDigit
            ]);

        $response->assertStatus(202);
        $response->assertJsonStructure([
                'success',
                'message',
                'data'
            ]);
    }
}
