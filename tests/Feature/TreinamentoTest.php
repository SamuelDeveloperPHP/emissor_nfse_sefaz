<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/** O treinamento é público: abre sem login e sem nenhum dado do sistema. */
class TreinamentoTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_training_page_is_public(): void
    {
        $this->get('/treinamento')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $p) => $p->component('Treinamento/index'));
    }

    public function test_the_root_still_requires_login(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }
}
