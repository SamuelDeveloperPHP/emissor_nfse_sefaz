<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class EmitentesCadastroTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['app.key' => 'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=']);
        $this->seed(RolesAndPermissionsSeeder::class);
        $this->actingAs(User::where('email', 'admin@example.com')->firstOrFail());
    }

    public function test_cadastra_emitente_alfanumerico_sanitizando_mascaras(): void
    {
        $this->post(route('emitentes.store'), [
            'razao_social' => " Empresa Teste\0 ",
            'cnpj' => '12.ABC.345/01DE-35',
            'cep' => '01310-100',
            'telefone' => '(11) 98765-4321',
            'ambiente' => 'homologacao',
            'driver' => 'simulador',
            'is_active' => true,
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('emitentes', [
            'razao_social' => 'Empresa Teste',
            'cnpj' => '12ABC34501DE35',
            'cep' => '01310100',
            'telefone' => '11987654321',
        ]);
    }

    public function test_consulta_cnpj_e_retorna_dados_para_preenchimento(): void
    {
        Http::fake([
            'brasilapi.com.br/*' => Http::response([
                'razao_social' => 'Empresa Consultada Ltda',
                'nome_fantasia' => 'Empresa Consultada',
                'cep' => '01310-100',
                'descricao_tipo_de_logradouro' => 'Avenida',
                'logradouro' => 'Paulista',
                'numero' => '1000',
                'bairro' => 'Bela Vista',
                'municipio' => 'São Paulo',
                'uf' => 'SP',
                'ddd_telefone_1' => '(11) 3333-4444',
            ]),
        ]);

        $this->getJson(route('emitentes.consultar-cnpj', '12ABC34501DE35'))
            ->assertOk()
            ->assertJsonPath('razao_social', 'Empresa Consultada Ltda')
            ->assertJsonPath('logradouro', 'Avenida Paulista')
            ->assertJsonPath('cep', '01310100')
            ->assertJsonPath('telefone', '1133334444');
    }

    public function test_mensagens_de_validacao_sao_exibidas_em_portugues(): void
    {
        $this->post(route('emitentes.store'), [])->assertSessionHasErrors([
            'razao_social' => 'O campo razão social é obrigatório.',
            'cnpj' => 'O campo CNPJ é obrigatório.',
        ]);
    }
}
