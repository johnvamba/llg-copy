<?php

namespace Tests\Feature;

use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\UserProfile;
use App\Goal;

class GoalTest extends TestCase
{
    protected $user;
    protected $userGoal;
    protected $goalTerm;

    public function setUp(): void
    {
        parent::setUp();

        Role::create(['name' => 'user']);

        $this->user = factory(User::class)->create();
        factory(UserProfile::class)->make([
            'user_id' => $this->user->id
        ]);
        $this->user->assignRole('user');

        $this->userGoal = factory(Goal::class)->create([
                'model_id' => $this->user->id,
                'model_type' => 'App\User'
            ]);

        $this->goalTerm = ['month', 'year'];
    }

    /** @test */
    public function a_user_can_set_needs_goal()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->post("api/user-goal/", [
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => random_int(1, 20)
            ]);
        
        $response->assertStatus(202);
        $response->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    /** @test */
    public function a_user_can_update_goal()
    {
        $this->actingAs($this->user, 'api');

        $this->withoutExceptionHandling();

        $response = $this->patch("api/goals/{$this->userGoal->id}", [
                'term' => $this->goalTerm[random_int(0, 1)],
                'need' => 20,
                'status' => 'achieved'
            ]);
        
        $response->assertStatus(202);
        $response->assertJsonStructure([
                'id',
                'model_id',
                'model_type',
                'term',
                'need',
                'status'
            ]);
    }
}
