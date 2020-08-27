<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;
    use WithFaker;
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();

        $this->command();
    }

    /** 
     * Run artisan artisan command migrate & passport installation 
     */
    public function command()
    {
        \Artisan::call('migrate',['-vvv' => true]);
        \Artisan::call('passport:install',['-vvv' => true]);
    }
}
