<?php

namespace Tests\Feature;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\NeedsCategory;

class NeedCategoryTest extends TestCase
{
    protected $admin;
    protected $category;

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

        $this->category = factory(NeedsCategory::class)->create();
    }

    /** @test */
    public function a_admin_can_add_create_needs_category()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/needs-categories', [
                'name' => $this->faker->text
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_fetch_needs_categories()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get('api/needs-categories');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_get_needs_categories()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post('api/needs-category/lists', [
                'limit' => 5
            ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_get_needs_category()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->get("api/needs-categories/{$this->category->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_update_needs_category()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $category = $this->category;

        $response = $this->patch("api/needs-categories/{$this->category->id}", [
                'name' => $this->faker->text,
                'status' => true
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_admin_can_delete_category()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $response = $this->delete("api/needs-categories/{$this->category->id}");

        $response->assertStatus(204);
    }
}
