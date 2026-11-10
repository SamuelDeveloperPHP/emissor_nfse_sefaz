<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\User;
use App\Services\Nfse\CertificadoA1;
use App\Services\Nfse\GestaoDeCertificado;
use App\Services\Nfse\NfseException;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\Concerns\GeraCertificadoDeTeste;
use Tests\TestCase;

/** Emitente "Certificado próprio" x "Procuração": the choice is stored and decides which certificate signs. */
class EmitentePorProcuracaoTest extends TestCase
{
    use GeraCertificadoDeTeste;
    use RefreshDatabase;

    private const SENHA = 'senha-escritorio-1';

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        $this->seed(RolesAndPermissionsSeeder::class);
        $this->admin = User::where('email', 'admin@example.com')->first();
        $this->actingAs($this->admin);
    }

    private User $admin;

    private function emitente(array $extra = []): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Cliente do Contador', 'cnpj' => '11222333000181', 'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345', 'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao', 'driver' => 'adn_nacional', 'is_active' => true,
            ...$extra,
        ]);
    }

    private function cadastrarCertificadoDoEscritorio(): void
    {
        app(GestaoDeCertificado::class)->enviarDoSistema($this->gerarPfx(self::SENHA, 365, 'ESCRITORIO CONTABIL LTDA:99888777000100'), self::SENHA, $this->admin);
    }

    public function test_new_emitentes_default_to_their_own_certificate(): void
    {
        $emitente = $this->emitente()->fresh();

        $this->assertSame(Emitente::CERTIFICADO_PROPRIO, $emitente->modo_certificado);
        $this->assertFalse($emitente->emitePorProcuracao());
    }

    public function test_the_choice_is_saved_on_create_and_update_and_only_known_values_are_accepted(): void
    {
        $dados = [
            'razao_social' => 'Cliente Novo', 'cnpj' => '11222333000181', 'ambiente' => 'homologacao',
            'driver' => 'adn_nacional', 'is_active' => true, 'modo_certificado' => 'procuracao',
        ];

        $this->post(route('emitentes.store'), $dados)->assertSessionHasNoErrors();
        $emitente = Emitente::firstOrFail();
        $this->assertSame('procuracao', $emitente->modo_certificado);

        $this->put(route('emitentes.update', $emitente), [...$dados, 'modo_certificado' => 'certificado'])->assertSessionHasNoErrors();
        $this->assertSame('certificado', $emitente->fresh()->modo_certificado);

        $this->put(route('emitentes.update', $emitente), [...$dados, 'modo_certificado' => 'qualquer'])->assertSessionHasErrors('modo_certificado');
        $this->assertSame('certificado', $emitente->fresh()->modo_certificado);

        // Left out (older forms), the saved choice is kept.
        $this->put(route('emitentes.update', $emitente), [...$dados, 'modo_certificado' => 'procuracao']);
        unset($dados['modo_certificado']);
        $this->put(route('emitentes.update', $emitente), $dados)->assertSessionHasNoErrors();
        $this->assertSame('procuracao', $emitente->fresh()->modo_certificado);
    }

    public function test_under_procuracao_the_office_certificate_signs_and_the_emitente_needs_none(): void
    {
        $emitente = $this->emitente(['modo_certificado' => 'procuracao']);
        $this->assertNull($emitente->certificado_path);

        $this->cadastrarCertificadoDoEscritorio();

        $certificado = CertificadoA1::doEmitente($emitente->fresh());
        $this->assertSame('99888777000100', $certificado->cnpj());
    }

    public function test_under_procuracao_without_the_office_certificate_the_error_says_what_to_do(): void
    {
        $emitente = $this->emitente(['modo_certificado' => 'procuracao']);

        $this->expectException(NfseException::class);
        $this->expectExceptionMessage('certificado do escritório não está cadastrado');

        CertificadoA1::doEmitente($emitente);
    }

    public function test_with_its_own_certificate_the_office_certificate_is_never_used(): void
    {
        $this->cadastrarCertificadoDoEscritorio();
        $emitente = $this->emitente(); // modo certificado, sem A1 enviado

        $this->expectException(NfseException::class);
        $this->expectExceptionMessage('não tem certificado digital A1');

        CertificadoA1::doEmitente($emitente);
    }

    public function test_the_certificates_screen_and_dashboard_know_the_difference(): void
    {
        $this->emitente(['modo_certificado' => 'procuracao']);
        $this->emitente(['cnpj' => '44555666000181', 'razao_social' => 'Outro Cliente']);

        $this->get(route('configuracoes.index'))->assertInertia(fn (AssertableInertia $p) => $p
            ->where('certificados.0.modo_certificado', 'procuracao')
            ->where('certificados.1.modo_certificado', 'certificado'));

        // Only the emitente that must send its own A1 counts as "sem certificado".
        $this->get(route('dashboard'))->assertInertia(fn (AssertableInertia $p) => $p->where('emitentes.sem_certificado', 1));
    }
}
