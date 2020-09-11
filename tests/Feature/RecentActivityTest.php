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
use App\Activity;

class RecentActivityTest extends TestCase
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
    public function a_user_can_fetch_recent_activities()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $activities = factory(Activity::class, 5)->create([
                'model_id' => $this->org->id,
                'model_type' => 'App\Organization',
                'user_id' => $this->user->id
            ]);

        $response = $this->get('api/activities');

        $response->assertStatus(200);
    }
}

