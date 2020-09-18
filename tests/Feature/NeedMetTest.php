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
use App\NeedsType;
use App\NeedsCategory;
use App\Need;
use App\NeedMet;

class NeedMetTest extends TestCase
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
    public function a_user_can_met_needs()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_category_id' => $this->category->id,
            'needs_type_id' => $this->type->id,
        ]);

        $need = $needs[0];

        $response = $this->post("api/needs-met", [
                'need_id' => $need->id
            ]);

        $response->assertStatus(202);
    }

    /** @test */
    public function a_user_can_fetch_need_met()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_category_id' => $this->category->id,
            'needs_type_id' => $this->type->id,
        ]);

        factory(NeedMet::class)->create([
            'user_id' => $this->user->id,
            'need_id' => $needs[0]->id
        ]);

        $response = $this->get("api/needs-met");

        $response->assertStatus(200);
    }

    /** @test */
    public function a_admin_can_fetch_need_met_total()
    {
        $this->actingAs($this->admin, 'api');

        $this->withoutExceptionHandling();

        $needs = factory(Need::class, 5)->create([
            'organization_id' => $this->org->id,
            'needs_category_id' => $this->category->id,
            'needs_type_id' => $this->type->id,
        ]);

        factory(NeedMet::class)->create([
            'user_id' => $this->user->id,
            'need_id' => $needs[0]->id
        ]);

        $response = $this->get("api/needs-mets/total");

        $response->assertStatus(200);
    }
}
