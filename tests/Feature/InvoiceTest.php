<?php

namespace Tests\Feature;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\Organization;
use App\NeedsType;
use App\NeedsCategory;
use App\Need;
use App\Invoice;

class InvoiceTest extends TestCase
{
    protected $admin;
    protected $user;
    protected $org;
    protected $need;
    protected $type;
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

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id,
            'preference' => json_encode(['Health', 'Food'])
        ]);
        $this->user->assignRole('user');

        $this->org = factory(Organization::class)->create();
        $this->type = factory(NeedsType::class)->create();
        $this->category = factory(NeedsCategory::class)->create();
    }

    /** @test */
    public function a_admin_fetch_top_donors()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $need = factory(Need::class)->create([
                'model_id' => $this->org->id,
                'model_type' => 'App\Organization',
                'needs_category_id' => $this->category->id,
                'needs_type_id' => $this->type->id,
            ]);

        factory(Invoice::class, 5)->create([
                'user_id' => $this->user->id,
                'model_id' => $need->id,
                'model_type' => 'App\Need'
            ]);

        $response = $this->get('api/invoice/top-donors');

        $response->assertStatus(200);
    }
}


