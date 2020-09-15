<?php

namespace Tests\Feature;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\NeedsType;

class NeedTypeTest extends TestCase
{
    protected $admin;
    protected $type;

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

        factory(NeedsType::class)->create();
    }

    /** @test */
    public function a_admin_can_get_needs_types()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get('api/needs-types');

        $response->assertStatus(200);
    }

}
